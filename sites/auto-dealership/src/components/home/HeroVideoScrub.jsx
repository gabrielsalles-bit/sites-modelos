import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroVideoScrub (AutoElite Motors - Auto-Dealership)
 * 
 * Experiência cinematográfica controlada por rolagem (ScrollTrigger scrub).
 * Apresenta 4 cenas (~10s) da concessionária (fachada, showroom, atendimento, chaves).
 * 
 * Acessibilidade e Desempenho:
 * - Suporte nativo a prefers-reduced-motion (exibe apenas o poster estático).
 * - Seleção inteligente de resolução: 720p (4.49MB) em mobile/tablet (<768px) e 1080p (13.5MB) em desktop.
 * - Sincronização via requestAnimationFrame + guarda seeking.
 * - Leitura zero de layout no loop de rolagem.
 * - aria-hidden="true", muted, playsInline no elemento <video>.
 */
export const HeroVideoScrub = ({ children }) => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const posterSrc = `${baseUrl}images/hero-video-poster.jpg`;

  // Seleção de vídeo responsivo (720p para mobile / 1080p para desktop)
  const [videoSrc, setVideoSrc] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return `${baseUrl}videos/${isMobile ? 'hero-scrub-720.mp4' : 'hero-scrub.mp4'}`;
  });

  // Atualização responsiva no resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const targetSrc = `${baseUrl}videos/${isMobile ? 'hero-scrub-720.mp4' : 'hero-scrub.mp4'}`;
      setVideoSrc((prev) => (prev !== targetSrc ? targetSrc : prev));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [baseUrl]);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Configuração do ScrollTrigger e sincronização via requestAnimationFrame
  useEffect(() => {
    if (reducedMotion || hasError) return;

    const video = videoRef.current;
    const container = containerRef.current;
    const pinEl = pinRef.current;
    if (!video || !container || !pinEl) return;

    let targetTime = 0;
    let rafId = null;

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!video || video.seeking) return;
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
          video.currentTime = targetTime;
        }
      });
    };

    const handleSeeked = () => {
      if (!video) return;
      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const duration = video.duration || 10;
          targetTime = Math.min(Math.max(self.progress * duration, 0), duration);
          scheduleUpdate();
        },
      });
    }, container);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [reducedMotion, hasError, isReady, videoSrc]);

  // Se o usuário preferir movimento reduzido, renderiza layout estático com o poster
  if (reducedMotion) {
    return (
      <section className="relative min-h-[90vh] overflow-hidden bg-[#080c14] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-125"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />
        </div>
        <div className="relative z-20 w-full pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] bg-[#080c14]"
      data-testid="hero-video-scrub-container"
    >
      {/* Viewport fixado (Pin) durante o scrub */}
      <div
        ref={pinRef}
        className="w-full h-screen relative overflow-hidden flex flex-col justify-center"
      >
        {/* Camada de Mídia (Poster + Vídeo) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#080c14]">
          {/* Poster inicial com prioridade de fetch alta */}
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-110 transition-opacity duration-700 ease-out ${
              isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* Vídeo scrubbable responsivo */}
          {!hasError && (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onLoadedData={() => setIsReady(true)}
              onCanPlayThrough={() => setIsReady(true)}
              onError={() => {
                setHasError(true);
                setIsReady(false);
              }}
              className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-110 transition-opacity duration-700 ${
                isReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Overlays profissionais para legibilidade WCAG AA */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080c14] via-[#080c14]/75 to-[#080c14]/40 pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Conteúdo da Hero sobreposto com z-index seguro */}
        <div className="relative z-20 w-full pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroVideoScrub;