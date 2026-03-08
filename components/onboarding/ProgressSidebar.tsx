import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface Step {
  label: string;
  minProgress: number;
  maxProgress: number;
}

const STEPS: Step[] = [
  { label: 'Account Created', minProgress: 0, maxProgress: 0 },
  { label: 'Business Info', minProgress: 0, maxProgress: 15 },
  { label: 'Services & Team', minProgress: 15, maxProgress: 45 },
  { label: 'Online Presence', minProgress: 45, maxProgress: 60 },
  { label: 'Goals & Pain Points', minProgress: 60, maxProgress: 75 },
  { label: 'Credentials Preview', minProgress: 75, maxProgress: 85 },
  { label: 'Automation Plan', minProgress: 85, maxProgress: 95 },
  { label: "You're Live!", minProgress: 95, maxProgress: 100 },
];

function getStatus(step: Step, progress: number, index: number): 'completed' | 'in_progress' | 'pending' {
  if (index === 0) return 'completed'; // Account always done
  if (progress >= step.maxProgress) return 'completed';
  if (progress >= step.minProgress) return 'in_progress';
  return 'pending';
}

interface ProgressSidebarProps {
  progressPercent: number;
  collectedData: Record<string, unknown>;
}

export function ProgressSidebar({ progressPercent, collectedData }: ProgressSidebarProps) {
  return (
    <div className="h-full bg-slate-900 text-white flex flex-col p-6">
      <div className="mb-8">
        <img src="/logo.png" alt="Autumn8" className="h-10 mb-1" />
        <p className="text-slate-400 text-xs">Setup in Progress</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Overall Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {STEPS.map((step, index) => {
          const status = getStatus(step, progressPercent, index);
          return (
            <div key={step.label} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                {status === 'completed' && (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                )}
                {status === 'in_progress' && (
                  <Loader2 className="h-4 w-4 text-orange-400 animate-spin" />
                )}
                {status === 'pending' && (
                  <Circle className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <div>
                <p className={`text-sm ${
                  status === 'completed' ? 'text-green-400' :
                  status === 'in_progress' ? 'text-white font-medium' :
                  'text-slate-500'
                }`}>
                  {step.label}
                </p>
                {status === 'completed' && index === 1 && typeof collectedData.businessName === 'string' && (
                  <p className="text-xs text-slate-500 mt-0.5">{collectedData.businessName}</p>
                )}
                {status === 'completed' && index === 2 && Array.isArray(collectedData.services) && (collectedData.services as string[]).length > 0 && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(collectedData.services as string[]).slice(0, 2).join(', ')}
                    {(collectedData.services as string[]).length > 2 ? '...' : ''}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Questions? Email{' '}
          <a href="mailto:team@autumn8.me" className="text-orange-400 hover:text-orange-300">
            team@autumn8.me
          </a>
        </p>
      </div>
    </div>
  );
}
