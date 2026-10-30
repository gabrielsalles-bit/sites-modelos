import React, { useState, useEffect, useRef } from 'react';
import {
  Car, Shield, Sparkles, Calculator, ArrowLeftRight,
  Crown, Building2, Menu, X, ArrowLeft, MessageCircle, Sun, Moon,
  Wrench, ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { dealershipInfo } from '../../data/dealershipInfo';
import { buildGeneralWhatsappLink } from '../../utils/whatsapp';

export function Navbar({ currentPage = 'home', onNavigate, theme = 'dark', onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target)) {
        setToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Páginas universais, sempre visíveis
  const corePages = [
    { id: 'home', label: 'Início', icon: Car },
    { id: 'estoque', label: 'Showroom VIP', icon: Crown },
    { id: 'destaques', label: 'Destaques', icon: Sparkles },
    { id: 'sobre-contato', label: 'Showroom & Contato', icon: Building2 }
  ];

  // Ferramentas: agrupadas num só menu para não poluir a barra principal
  const toolPages = [
    { id: 'simulador', label: 'Simulador Private', icon: Calculator },
    { id: 'troca', label: 'Avaliação de Troca', icon: ArrowLeftRight },
    { id: 'concierge', label: 'Concierge', icon: Shield }
  ];

  const isToolPageActive = toolPages.some((p) => p.id === currentPage);

  const handleNavClick = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setMobileMenuOpen(false);
    setToolsMenuOpen(false);
  };

  const whatsappUrl = buildGeneralWhatsappLink();

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-surface-page/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl shadow-black/60 py-3' 
        : 'bg-surface-page/80 backdrop-blur-sm border-b border-ink/10 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Voltar ao Hub & Logotipo */}
          <div className="flex items-center gap-3">
            <a
              href="/sites-modelos/"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-surface-card transition-colors mr-1 sm:mr-2 shrink-0"
              title="Voltar ao Showcase de Modelos"
            >
              <ArrowLeft className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Crown className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 block">
                  APEX MOTORS
                </span>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <Shield className="w-3 h-3 text-amber-400" />
                  Luxury & Exotic Supercars
                </p>
              </div>
            </button>
          </div>

          {/* Links Desktop (Abas) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-surface-page/60 border border-ink/10 backdrop-blur-md">
            {corePages.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                      : 'text-slate-400 hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Menu de Ferramentas: agrupa Simulador, Troca e Concierge */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                onClick={() => setToolsMenuOpen((v) => !v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                  isToolPageActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'text-slate-400 hover:text-ink hover:bg-ink/5'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Ferramentas</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-surface-card border border-amber-500/20 shadow-2xl shadow-black/40 p-1.5 animate-fade-in">
                  {toolPages.map((link) => {
                    const Icon = link.icon;
                    const isActive = currentPage === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'text-slate-300 hover:bg-ink/5 hover:text-ink'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-amber-400" />
                        <span>{link.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Ações / Tema + Atendimento VIP */}
          <div className="hidden sm:flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-page/60 border border-ink/10 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors shrink-0"
                title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
                aria-label="Alternar tema claro/escuro"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}
            <Button
              variant="gold"
              size="sm"
              icon={MessageCircle}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Atendimento VIP
            </Button>
          </div>

          {/* Botão Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-surface-page/60 border border-ink/10 text-slate-300 hover:text-ink"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-page/95 border-b border-ink/10 px-5 py-6 space-y-4 backdrop-blur-2xl animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {corePages.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-300 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-ink/10">
            <p className="px-4 pb-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
              <Wrench className="w-3 h-3" />
              Ferramentas
            </p>
            <nav className="flex flex-col space-y-2">
              {toolPages.map((link) => {
                const Icon = link.icon;
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-300 hover:bg-ink/5 hover:text-ink'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-2 border-t border-ink/10 space-y-3">
            <Button
              variant="gold"
              size="md"
              icon={MessageCircle}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Concierge WhatsApp ({dealershipInfo.whatsappFormatado})
            </Button>

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-page border border-ink/10 text-slate-300 text-sm font-semibold hover:text-ink transition-colors"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>{theme === 'light' ? 'Modo escuro' : 'Modo claro'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
