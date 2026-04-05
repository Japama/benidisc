import logo from '../../media/Logo.jpeg';

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="Benidisc logo" className="h-12 w-12 rounded-full object-cover shadow-sm" />
      {/* <div className="leading-tight">
        <div className="text-base uppercase tracking-[0.26em] text-slate-700">Beni</div>
        <div className="text-xl font-black text-slate-950">disc</div>
      </div> */}
    </div>
  );
}

export default Logo;
