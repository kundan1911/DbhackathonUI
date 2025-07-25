'use client';

import Image from 'next/image';
import * as Accordion from '@radix-ui/react-accordion';
import { useEffect, useState } from 'react';

interface ProfileProps {
  user_id: number;
  personal_info: {
    name: string;
    date_of_birth: string;
    gender: string;
    marital_status: string;
    dependents: number;
    occupation: string;
    education_level: string;
    location: {
      city: string;
      country: string;
    };
  };
  income: {
    monthly_salary: number;
    additional_income: number;
  };
  expenses: {
    monthly_fixed: {
      utilities: number;
      insurance: number;
    };
    monthly_variable: {
      groceries: number;
      transportation: number;
    };
  };
  savings: {
    emergency_fund: number;
    retirement_savings: number;
  };
  investments: {
    stocks: {
      amount: number;
      risk_level: string;
    };
    mutual_funds: {
      amount: number;
      fund_types: [
        "Equity",
        "Index"
      ]
    }
    fixed_deposits: {
      amount: number;
      maturity_period: string;
    };
    real_estate: {
      property_type: string;
      market_value: number;
    };
    crypto: {
      amount: number;
      portfolio: [
        "Bitcoin",
        "Solana"
      ];
    }
  };
  liabilities: any[]; // You can refine this if you expect a certain structure
  assets: any[]; // Likewise
  insurance_coverage: {
    life: number;
    health: number;
  };
  financial_goals: any[]; // Can be defined if needed
  risk_profile: {
    risk_appetite: string;
    investment_horizon: string;
    loss_tolerance: string;
  };
  avatar?: string;
}
export default function ProfilePage(props: Partial<ProfileProps>) {
  const [profile, setProfile] = useState<Partial<ProfileProps>>({});

  useEffect(() => {
    const stored = localStorage.getItem('profileData');
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch {
        // fallback to props/defaults if JSON parse fails
      }
    }
  }, []);
  console.log('Profile data:', profile.user_id);

  return (
    <div className="container mx-auto p-6 flex flex-row items-start justify-start gap-8 min-h-screen">
      {/* Profile Tile */}
      <div className="bg-card shadow-lg rounded-xl p-4 flex flex-col items-center max-w-xs w-full h-[550px]">
        <Image
          src={profile.avatar || '/profile_img.jpg'}
          alt="Profile"
          width={96}
          height={96}
          className="rounded-full mb-4 border-4 border-primary"
        />
        <h2 className="text-2xl font-bold mb-2">{profile.personal_info?.name}</h2>
        <p className="text-muted-foreground mb-2">{profile.personal_info?.date_of_birth}</p>
        <p className="text-muted-foreground mb-2">{profile.personal_info?.occupation}</p>
        <div className="space-y-2 text-center">
          <div className="flex justify-center gap-2">
            <span className="font-semibold w-32 text-right">Gender:</span>
            <span>{profile.personal_info?.gender}</span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="font-semibold w-32 text-right">Marital Status:</span>
            <span>{profile.personal_info?.marital_status}</span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="font-semibold w-32 text-right">Country:</span>
            <span>{profile.personal_info?.location.country}</span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="font-semibold w-32 text-right">Emergency Savings:</span>
            <span>{profile.savings?.emergency_fund}</span>
          </div>
          <div className="flex justify-center gap-2">
            <span className="font-semibold w-32 text-right">Retirement Savings:</span>
            <span>{profile.savings?.retirement_savings}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          {/* <span>Joined: {user.joined}</span> */}
        </div>
      </div>

      {/* Liabilities Tile */}
      {profile.liabilities && profile.liabilities.length !== 0 && (
      <div className="bg-card shadow-lg rounded-xl p-4 flex flex-col max-w-xs w-full">
        <h3 className="text-lg font-semibold mb-2">Liabilities</h3>
        <Accordion.Root type="multiple" className="bg-muted rounded-lg">
          {profile.liabilities?.map((item, idx) => (
            <Accordion.Item value={`item-${idx}`} key={idx} className="border-b last:border-b-0">
              <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
                {item.type === 'Home Loan'
                  ? '🏠 Home Loan'
                  : item.type === 'Personal Loan'
                    ? '💼 Personal Loan' :
                    item.type === 'Credit Card'
                      ? '💳 Credit Card'
                      :
                      '🚗 Car Loan'}
              </Accordion.Trigger>
              <Accordion.Content className="px-4 pb-4">
                {item.type === 'Home Loan' || item.type === 'Personal Loan' || item.type === 'Car Loan' ? (
                  <div className="flex flex-col gap-1">
                    <span>Principal: ₹{item.principal.toLocaleString()}</span>
                    <span>Interest Rate: {item.interest_rate}%</span>
                    <span>Tenure Remaining: {item.tenure_remaining.replace('_', ' ')}</span>
                  </div>
                ) : item.type === 'Credit Card' ? (
                  <div className="flex flex-col gap-1">
                    <span>Total Limit: ₹{item.total_limit.toLocaleString()}</span>
                    <span>Current Utilization: ₹{item.current_utilization.toLocaleString()}</span>
                  </div>
                ) : null}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
      )}
      {/* Assets Tile */}
      {profile.assets && profile.assets.length !== 0 && (
      <div className="bg-card shadow-lg rounded-xl p-4 flex flex-col max-w-xs w-full">
        <h3 className="text-lg font-semibold mb-2">Assets</h3>
        <Accordion.Root type="multiple" className="bg-muted rounded-lg">
          {profile.assets?.map((asset, idx) => (
            <Accordion.Item value={`asset-${idx}`} key={idx} className="border-b last:border-b-0">
              <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
                {asset.type === 'Vehicle'
                  ? '🚗 Vehicle'
                  : asset.type === 'Electronics'
                    ? '💻 Electronics'
                    : asset.type === 'Business'
                      ? '🏢 Business'
                      : asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
              </Accordion.Trigger>
              <Accordion.Content className="px-4 pb-4">
                <div className="flex flex-col gap-1">
                  <span>Category: {asset.category.replace('_', ' ')}</span>
                  <span>Value: ₹{asset.value.toLocaleString()}</span>
                  <span>Loan Remaining: ₹{asset.loan_remaining.toLocaleString()}</span>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
)}
      {/* Investments Tile */}
      {profile.investments && (
      <div className="bg-card shadow-lg rounded-xl p-4 flex flex-col max-w-xs w-full">
        <h3 className="text-lg font-semibold mb-2">Investments</h3>
        <Accordion.Root type="multiple" className="bg-muted rounded-lg">
          {/* Stocks */}
          {profile.investments?.stocks && (
          <Accordion.Item value="stocks" className="border-b">
            <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
              📈 Stocks
            </Accordion.Trigger>
            <Accordion.Content className="px-4 pb-4">
              <div className="flex flex-col gap-1">
                <span>Amount: ₹{profile.investments?.stocks.amount.toLocaleString() ||'NA'}</span>
                <span>Risk Level: {profile.investments?.stocks.risk_level}</span>
              </div>
            </Accordion.Content>
          </Accordion.Item>
          )}
          {/* Mutual Funds */}
          {profile.investments?.mutual_funds && (
          <Accordion.Item value="mutual_funds" className="border-b">
            <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
              🏦 Mutual Funds
            </Accordion.Trigger>
            <Accordion.Content className="px-4 pb-4">
              <div className="flex flex-col gap-1">
                <span>Amount: ₹{profile.investments?.mutual_funds.amount.toLocaleString() ||'NA'}</span>
                <span>Fund Types: {profile.investments?.mutual_funds.fund_types.join(", ") }</span>
              </div>
            </Accordion.Content>
          </Accordion.Item>
          )}
          {/* Crypto */}
          {profile.investments?.crypto && (
          <Accordion.Item value="crypto" className="border-b">
            <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
              🪙 Crypto
            </Accordion.Trigger>
            <Accordion.Content className="px-4 pb-4">
              <div className="flex flex-col gap-1">
                <span>Amount: ₹{profile.investments?.crypto.amount.toLocaleString() ||'NA'}</span>
                <span>Portfolio: {profile.investments?.crypto.portfolio.join(", ")}</span>
              </div>
            </Accordion.Content>
          </Accordion.Item>
          )}
          {/* Real Estate */}
          <Accordion.Item value="real_estate">
            <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
              🏠 Real Estate
            </Accordion.Trigger>
            <Accordion.Content className="px-4 pb-4">
              <div className="flex flex-col gap-1">
                <span>No real estate investments.</span>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      )}
      {/* Financial Goals */}
      {profile.financial_goals && profile.financial_goals.length !== 0 && (
      <div className="bg-card shadow-lg rounded-xl p-4 flex flex-col max-w-xs w-full">
        <h3 className="text-lg font-semibold mb-2">Financial Goals</h3>
        <Accordion.Root type="multiple" className="bg-muted rounded-lg">
          {profile.financial_goals?.map((goal, idx) => (
            <Accordion.Item value={`goal-${idx}`} key={idx} className="border-b last:border-b-0">
              <Accordion.Trigger className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted-foreground/10 transition">
                {goal.type === 'Retirement'
                  ? '🧓 Retirement'
                  : goal.type === 'Education'
                    ? '🎓 Education'
                    : goal.type === 'Vacation'
                      ? '🏖️ Vacation'
                      : goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}
              </Accordion.Trigger>
              <Accordion.Content className="px-4 pb-4">
                <div className="flex flex-col gap-1">
                  <span>Target Amount: ₹{goal.target_amount.toLocaleString() ||'NA'}</span>
                  <span>Target Date: {new Date(goal.target_date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
      )}
    </div>
  );
}