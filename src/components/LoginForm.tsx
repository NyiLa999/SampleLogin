import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, Github } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    console.log('Login data:', data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Logged in successfully (Simulated)');
  };

  return (
    <div className="mx-auto w-full max-w-sm space-y-12" id="login-form-container">
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-light tracking-tight text-white"
          id="login-heading"
        >
          Credential Entry
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-sm font-light"
          id="login-subheading"
        >
          Access the centralized control panel.
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-10"
        id="login-form"
      >
        <div className="space-y-4">
          <label className="text-micro block" htmlFor="email">
            Account Identity
          </label>
          <div className="relative group">
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="name@interface.io"
              className="w-full input-underline py-4 text-lg font-light placeholder:text-white/10"
            />
            {errors.email ? (
              <div className="absolute right-0 bottom-4 flex items-center gap-2">
                <span className="text-[10px] text-red-400 font-bold uppercase">Invalid</span>
                <div className="w-2 h-2 rounded-full bg-red-400" />
              </div>
            ) : (
              <div className="absolute right-0 bottom-4 flex items-center gap-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                <span className="text-[10px] text-green-500 font-bold uppercase">Awaiting</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            )}
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-red-400 uppercase tracking-widest font-bold"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <label className="text-micro block" htmlFor="password">
            Security Key
          </label>
          <div className="relative group">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••"
              className="w-full input-underline py-4 text-lg font-light placeholder:text-white/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-10 bottom-4 flex items-center text-white/20 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.password ? (
              <div className="absolute right-0 bottom-4 flex items-center gap-2">
                <span className="text-[10px] text-red-400 font-bold uppercase">Check</span>
                <div className="w-2 h-2 rounded-full bg-red-400" />
              </div>
            ) : (
              <div className="absolute right-0 bottom-4 flex items-center gap-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            )}
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-red-400 uppercase tracking-widest font-bold"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-4 space-y-8">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => document.getElementById('rememberMe')?.click()}>
            <input
              {...register('rememberMe')}
              type="checkbox"
              id="rememberMe"
              className="w-3 h-3 rounded-sm border border-white/40 bg-white/10 text-white focus:ring-0 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-xs text-white/50 select-none cursor-pointer group-hover:text-white transition-colors">
              Keep session active for 24 hours
            </label>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-white text-black font-black text-xs uppercase tracking-[0.25em] py-5 flex items-center justify-center space-x-2 hover:bg-neutral-200 transition-all"
              id="login-submit-button"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Execute Entry</span>
              )}
            </motion.button>

            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest pt-2">
              <a href="#" className="text-white/30 hover:text-white transition-colors">Lost credentials?</a>
              <a href="#" className="text-white/30 hover:text-white transition-colors">Register portal</a>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
