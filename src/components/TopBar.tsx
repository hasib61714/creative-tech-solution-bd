import { Phone, Mail } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-slate-900 border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <a href="tel:+8801784753468" className="flex items-center gap-1.5 text-slate-300 hover:text-white text-[11px] transition-colors duration-200">
              <Phone className="w-3 h-3 text-red-400" />
              <span className="hidden sm:inline">+8801784753468</span>
              <span className="sm:hidden">Call Us</span>
            </a>
            <span className="hidden md:block w-px h-3 bg-white/20" />
            <a href="mailto:creativetechsolutionbd@gmail.com" className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white text-[11px] transition-colors duration-200">
              <Mail className="w-3 h-3 text-blue-400" />
              creativetechsolutionbd@gmail.com
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-1 text-slate-500 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
