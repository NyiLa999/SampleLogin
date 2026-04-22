import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#050505]" id="app-main">
      {/* Editorial Side */}
      <div className="w-full md:w-1/2 h-auto md:h-screen p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10" id="visual-section">
        <div className="text-micro">System Access / 0.14</div>
        
        <div className="flex flex-col py-12 md:py-0">
          <div className="display-heavy opacity-20">SIGN</div>
          <div className="display-heavy">IN</div>
        </div>

        <div className="flex items-center gap-6 text-micro opacity-40">
          <span>Terms</span>
          <span>Privacy</span>
          <span>v.24.8.0</span>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center bg-[#0a0a0a] min-h-[60vh] md:min-h-screen px-8 py-12 md:px-12 lg:px-24" id="form-section">
        <LoginForm />
      </div>
    </main>
  );
}
