import React, { useMemo, useState } from 'react';
import './healthcost.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const PLANS_INDIA = {
  Basic: {
    name: 'Basic Health Cover',
    monthlyPremium: 600,
    roomLimit: 2000,
    copayPercent: 0.10,
    cashless: true
  },
  Standard: {
    name: 'Standard Family Plan',
    monthlyPremium: 1200,
    roomLimit: 4000,
    copayPercent: 0.05,
    cashless: true
  },
  Senior: {
    name: 'Senior Citizen Plan',
    monthlyPremium: 1800,
    roomLimit: 3000,
    copayPercent: 0.20,
    cashless: false
  }
};

const money = (n) =>
  (Number(n) || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const Healthcost = () => {
  const [planKey, setPlanKey] = useState('Standard');
  const plan = useMemo(() => PLANS_INDIA[planKey], [planKey]);

  const [months, setMonths] = useState(12);
  const [gpVisits, setGpVisits] = useState(3);
  const [specialistVisits, setSpecialistVisits] = useState(1);
  const [testsCost, setTestsCost] = useState(3000);
  const [medicinesMonthly, setMedicinesMonthly] = useState(600);
  const [hospitalDays, setHospitalDays] = useState(0);
  const [hospitalDailyCost, setHospitalDailyCost] = useState(6000);
  const [isCashlessHospital, setIsCashlessHospital] = useState(true);

  const PRICE = {
    gpVisit: 300,
    specialistVisit: 700
  };

  // Calculations
  const premiumYear = plan.monthlyPremium * Math.min(12, Math.max(1, months));

  const opdDoctorCost = gpVisits * PRICE.gpVisit + specialistVisits * PRICE.specialistVisit;
  const opdMedicinesYear = medicinesMonthly * 12;
  const opdTestsYear = testsCost;

  const roomAllowed = plan.roomLimit;
  const allowedPerDay = Math.min(hospitalDailyCost, roomAllowed + 3000);
  const hospitalAllowedTotal = allowedPerDay * hospitalDays;
  const copay = hospitalAllowedTotal * plan.copayPercent;

  const isCashless = plan.cashless && isCashlessHospital;
  const nonCashlessCharge = isCashless ? 0 : hospitalAllowedTotal * 0.1;

  const overRoomAndTreatment = Math.max(0, hospitalDailyCost - allowedPerDay) * hospitalDays;

  const memberHospitalPay = copay + nonCashlessCharge + overRoomAndTreatment;
  const insurerHospitalPay = Math.max(0, hospitalAllowedTotal - copay);

  const memberTotal =
    premiumYear + opdDoctorCost + opdMedicinesYear + opdTestsYear + memberHospitalPay;

  return (
    <>
    <Navbar/>
    <div className="healthcost-wrapper">
      <header className="healthcost-header">
        <h1 className="healthcost-title">Health Cost Calculator (India)</h1>
        <p className="healthcost-subtitle">
          Simple yearly estimate: premium, doctor fees, tests, medicines, and hospital stay.
        </p>
      </header>

      {/* Section: Plan */}
      <section className="healthcost-section">
        <div className="healthcost-card">
          <h2 className="healthcost-card-title">Choose Plan</h2>

          <div className="healthcost-form">
            <div className="healthcost-field">
              <label className="healthcost-label">Plan</label>
              <select
                className="healthcost-input"
                value={planKey}
                onChange={(e) => setPlanKey(e.target.value)}
              >
                {Object.entries(PLANS_INDIA).map(([k, p]) => (
                  <option key={k} value={k}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="healthcost-field">
              <label className="healthcost-label">Months Covered</label>
              <input
                className="healthcost-input"
                type="number"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
              />
            </div>
          </div>

          <div className="healthcost-info">
            <div className="healthcost-info-row"><span>Monthly Premium</span><strong>{money(plan.monthlyPremium)}</strong></div>
            <div className="healthcost-info-row"><span>Room Limit / day</span><strong>{money(plan.roomLimit)}</strong></div>
            <div className="healthcost-info-row"><span>Co‑pay</span><strong>{Math.round(plan.copayPercent * 100)}%</strong></div>
            <div className="healthcost-info-row"><span>Cashless Network</span><strong>{plan.cashless ? 'Yes' : 'No'}</strong></div>
          </div>
        </div>
      </section>

      {/* Section: Usage */}
      <section className="healthcost-section">
        <div className="healthcost-card">
          <h2 className="healthcost-card-title">Your Yearly Usage</h2>

          <div className="healthcost-form healthcost-form-grid">
            <div className="healthcost-field">
              <label className="healthcost-label">Local Doctor Visits</label>
              <input className="healthcost-input" type="number" min="0" value={gpVisits}
                     onChange={(e)=>setGpVisits(Math.max(0, Number(e.target.value)||0))}/>
            </div>

            <div className="healthcost-field">
              <label className="healthcost-label">Specialist Visits</label>
              <input className="healthcost-input" type="number" min="0" value={specialistVisits}
                     onChange={(e)=>setSpecialistVisits(Math.max(0, Number(e.target.value)||0))}/>
            </div>

            <div className="healthcost-field">
              <label className="healthcost-label">Tests (total ₹/year)</label>
              <input className="healthcost-input" type="number" min="0" value={testsCost}
                     onChange={(e)=>setTestsCost(Math.max(0, Number(e.target.value)||0))}/>
            </div>

            <div className="healthcost-field">
              <label className="healthcost-label">Medicines (₹/month)</label>
              <input className="healthcost-input" type="number" min="0" value={medicinesMonthly}
                     onChange={(e)=>setMedicinesMonthly(Math.max(0, Number(e.target.value)||0))}/>
            </div>
          </div>

          <h3 className="healthcost-subsection">Hospital Stay (if any)</h3>
          <div className="healthcost-form healthcost-form-grid">
            <div className="healthcost-field">
              <label className="healthcost-label">Days in Hospital</label>
              <input className="healthcost-input" type="number" min="0" value={hospitalDays}
                     onChange={(e)=>setHospitalDays(Math.max(0, Number(e.target.value)||0))}/>
            </div>

            <div className="healthcost-field">
              <label className="healthcost-label">Avg. Cost per Day (₹)</label>
              <input className="healthcost-input" type="number" min="0" value={hospitalDailyCost}
                     onChange={(e)=>setHospitalDailyCost(Math.max(0, Number(e.target.value)||0))}/>
            </div>
          </div>

          <div className="healthcost-field">
            <label className="healthcost-label">Cashless Hospital?</label>
            <select
              className="healthcost-input"
              value={isCashlessHospital ? 'yes' : 'no'}
              onChange={(e)=>setIsCashlessHospital(e.target.value === 'yes')}
            >
              <option value="yes">Yes (network hospital)</option>
              <option value="no">No (reimbursement)</option>
            </select>
          </div>

          <p className="healthcost-note">
            Tip: Government/ESI hospitals cost less. Private hospital rates vary by city and room type.
          </p>
        </div>
      </section>

      {/* Section: Results */}
      <section className="healthcost-section">
        <div className="healthcost-card">
          <h2 className="healthcost-card-title">Results</h2>

          <div className="healthcost-summary">
            <div className="healthcost-stat">
              <span>Yearly Premium</span>
              <strong>{money(premiumYear)}</strong>
            </div>
            <div className="healthcost-stat">
              <span>Doctor + Tests + Medicines</span>
              <strong>{money(opdDoctorCost + opdTestsYear + opdMedicinesYear)}</strong>
            </div>
            <div className="healthcost-stat">
              <span>Hospital (you pay)</span>
              <strong>{money(memberHospitalPay)}</strong>
            </div>
            <div className="healthcost-stat healthcost-muted">
              <span>Hospital (insurer pays approx.)</span>
              <strong>{money(insurerHospitalPay)}</strong>
            </div>
            <div className="healthcost-stat healthcost-total">
              <span>Estimated Total You Pay in a Year</span>
              <strong>{money(memberTotal)}</strong>
            </div>
          </div>

          <details className="healthcost-details">
            <summary>Show Hospital Calculation</summary>
            <div className="healthcost-break">
              <div><span>Allowed per day by plan</span><strong>{money(allowedPerDay)}</strong></div>
              <div><span>Co‑pay (your share)</span><strong>{money(copay)}</strong></div>
              <div><span>Extra due to non‑cashless</span><strong>{money(nonCashlessCharge)}</strong></div>
              <div><span>Over room/treatment limit</span><strong>{money(overRoomAndTreatment)}</strong></div>
            </div>
          </details>

          <div className="healthcost-disclaimer">
            This is a simple estimate. Real bills depend on hospital, city and your policy. For exact details, read your policy document or contact your insurer/agent.
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Healthcost;
