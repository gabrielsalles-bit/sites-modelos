import React, { useState, useEffect, useRef } from 'react';
import {
  Car, ShieldCheck, MessageCircle, Menu, X,
  Home, Grid, Sparkles, Building2, ArrowLeft, Sun, Moon,
  Calculator, ArrowLeftRight, Wrench, ChevronDown, Headset, Scale, Heart
} from 'lucide-react';
import { Button } from '../ui/Button';
import { dealershipInfo } from '../../data/dealershipInfo';
import { buildGeneralWhatsappLink } from '../../utils/whatsapp';

export function Navbar({
  currentPage = 'home',
  onNavigate,
  favoritesCount = 0,
  comparedCount = 0,
  theme = 'dark',
  onToggleTheme
}) {
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
    { id: 'home', label: 'Início', icon: Home },
    { id: 'estoque', label: 'Estoque', icon: Grid },
    { id: 'destaques', label: 'Destaques', icon: Sparkles },
    { id: 'sobre-contato', label: 'Sobre & Contato', icon: Building2 }
  ];

  // Ferramentas: agrupadas num só menu para não poluir a barra principal
  const toolPages = [
    { id: 'simulador', label: 'Simulador de Financiamento', icon: Calculator },
    { id: 'troca', label: 'Troca Fácil', icon: ArrowLeftRight },
    { id: 'comparador', label: 'Comparador', icon: Scale, count: comparedCount },
    { id: 'favoritos', label: 'Favoritos', icon: Heart, count: favoritesCount },
    { id: 'concierge', label: 'Consultor Dedicado', icon: Headset }
  ];

  const isToolPageActive = toolPages.some((p) => p.id === currentPage);
  const toolsBadgeCount = comparedCount + favoritesCount;

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
        ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3' 
        : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Voltar ao Hub & Logotipo */}
          <div className="flex items-center gap-3">
            <a
              href="/sites-modelos/"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-slate-900 transition-colors mr-1 sm:mr-2 shrink-0"
              title="Voltar ao Showcase de Modelos"
            >
              <ArrowLeft className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-black text-xl text-ink tracking-tight block">
                  AutoElite
                </span>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Seminovos Selecionados
                </p>
              </div>
            </button>
          </div>

          {/* Links Desktop (Abas) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-md">
            {corePages.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/10'
                      : 'text-slate-400 hover:text-ink hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Menu de Ferramentas: agrupa Simulador e Troca Fácil */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                onClick={() => setToolsMenuOpen((v) => !v)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isToolPageActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/10'
                    : 'text-slate-400 hover:text-ink hover:bg-slate-800/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Ferramentas</span>
                {toolsBadgeCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-400 text-black text-[10px] font-bold flex items-center justify-center">
                    {toolsBadgeCount}
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-60 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/40 p-1.5 animate-fade-in">
                  {toolPages.map((link) => {
                    const Icon = link.icon;
                    const isActive = currentPage === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-ink'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-blue-400" />
                        <span className="flex-1">{link.label}</span>
                        {link.count !== undefined && link.count > 0 && (
                          <span className="w-4 h-4 rounded-full bg-blue-400 text-black text-[10px] font-bold flex items-center justify-center">
                            {link.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Ação Principal: Tema + WhatsApp */}
          <div className="hidden sm:flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900/60 border border-slate-800/60 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors shrink-0"
                title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
                aria-label="Alternar tema claro/escuro"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}
            <Button
              variant="whatsapp"
              size="sm"
              icon={MessageCircle}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale Conosco
            </Button>
          </div>

          {/* Botão Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-ink"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-5 py-6 space-y-4 backdrop-blur-xl animate-fade-in">
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
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-ink'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-900">
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
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{link.label}</span>
                    </div>
                    {link.count !== undefined && link.count > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-blue-400 text-black text-xs font-bold">
                        {link.count}
                      </span>
                    ) : isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-2 border-t border-slate-900 space-y-3">
            <Button
              variant="whatsapp"
              size="md"
              icon={MessageCircle}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              WhatsApp do Plantão ({dealershipInfo.whatsappFormatado})
            </Button>

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-semibold hover:text-ink transition-colors"
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
