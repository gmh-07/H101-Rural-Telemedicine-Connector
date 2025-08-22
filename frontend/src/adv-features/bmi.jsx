import React, { useMemo, useState } from 'react';
import './bmi.css';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

const categories = [
  { name: 'Underweight', max: 18.4, color: '#0ea5e9' },
  { name: 'Normal', min: 18.5, max: 24.9, color: '#22c55e' },
  { name: 'Overweight', min: 25, max: 29.9, color: '#f59e0b' },
  { name: 'Obese', min: 30, color: '#ef4444' }
];

const formatNumber = (n, d=1) => (isFinite(n) ? Number(n).toFixed(d) : '-');

const BMI = () => {
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'
  // Metric
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');
  // Imperial
  const [lb, setLb] = useState('');
  const [ft, setFt] = useState('');
  const [inch, setInch] = useState('');

  // Optional target BMI
  const [targetBmi, setTargetBmi] = useState(22);

  // Convert to kg/m for calculation
  const { weightKg, heightM } = useMemo(() => {
    if (unit === 'metric') {
      const w = parseFloat(kg) || 0;
      const hM = (parseFloat(cm) || 0) / 100;
      return { weightKg: w, heightM: hM };
    } else {
      const w = (parseFloat(lb) || 0) * 0.45359237;
      const hInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
      const hM = hInches * 0.0254;
      return { weightKg: w, heightM: hM };
    }
  }, [unit, kg, cm, lb, ft, inch]);

  const bmi = useMemo(() => {
    if (heightM <= 0) return 0;
    return weightKg / (heightM * heightM);
  }, [weightKg, heightM]);

  const cat = useMemo(() => {
    for (const c of categories) {
      const minOk = c.min == null || bmi >= c.min;
      const maxOk = c.max == null || bmi <= c.max;
      if (minOk && maxOk) return c;
    }
    return null;
  }, [bmi]);

  const normalMin = 18.5;
  const normalMax = 24.9;

  const healthyWeightRange = useMemo(() => {
    if (heightM <= 0) return null;
    const minW = normalMin * heightM * heightM;
    const maxW = normalMax * heightM * heightM;
    return { minKg: minW, maxKg: maxW };
  }, [heightM]);

  const targetWeight = useMemo(() => {
    if (heightM <= 0 || !targetBmi) return null;
    const t = parseFloat(targetBmi);
    if (!isFinite(t) || t <= 0) return null;
    return t * heightM * heightM; // in kg
  }, [heightM, targetBmi]);

  // Helpers to present weights in chosen unit
  const formatWeight = (kgVal) => {
    if (!isFinite(kgVal)) return '-';
    if (unit === 'metric') return `${formatNumber(kgVal, 1)} kg`;
    const lbVal = kgVal / 0.45359237;
    return `${formatNumber(lbVal, 1)} lb`;
  };

  const handleReset = () => {
    setKg(''); setCm('');
    setLb(''); setFt(''); setInch('');
  };

  return (
    <>
    <Navbar/>
    <div className="bmi-wrapper">
      <header className="bmi-header">
        <h1 className="bmi-title">BMI Calculator</h1>
        <p className="bmi-subtitle">Simple and clean. Enter height and weight to see BMI, category, and healthy ranges.</p>
      </header>

      <section className="bmi-section">
        <div className="bmi-card">
          <h2 className="bmi-card-title">Enter Details</h2>

          <div className="bmi-field">
            <label className="bmi-label">Units</label>
            <select className="bmi-input" value={unit} onChange={(e)=>{ setUnit(e.target.value); handleReset(); }}>
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lb, ft-in)</option>
            </select>
          </div>

          {unit === 'metric' ? (
            <div className="bmi-form-grid">
              <div className="bmi-field">
                <label className="bmi-label">Weight (kg)</label>
                <input className="bmi-input" type="number" min="0" step="0.1"
                  value={kg} onChange={(e)=>setKg(e.target.value)} placeholder="e.g., 68" />
              </div>
              <div className="bmi-field">
                <label className="bmi-label">Height (cm)</label>
                <input className="bmi-input" type="number" min="0" step="0.1"
                  value={cm} onChange={(e)=>setCm(e.target.value)} placeholder="e.g., 172" />
              </div>
            </div>
          ) : (
            <div className="bmi-form-grid">
              <div className="bmi-field">
                <label className="bmi-label">Weight (lb)</label>
                <input className="bmi-input" type="number" min="0" step="0.1"
                  value={lb} onChange={(e)=>setLb(e.target.value)} placeholder="e.g., 150" />
              </div>
              <div className="bmi-field">
                <label className="bmi-label">Height (ft)</label>
                <input className="bmi-input" type="number" min="0" step="1"
                  value={ft} onChange={(e)=>setFt(e.target.value)} placeholder="e.g., 5" />
              </div>
              <div className="bmi-field">
                <label className="bmi-label">Height (in)</label>
                <input className="bmi-input" type="number" min="0" step="0.5"
                  value={inch} onChange={(e)=>setInch(e.target.value)} placeholder="e.g., 8" />
              </div>
            </div>
          )}

          <div className="bmi-actions">
            <button className="bmi-btn" type="button" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </section>

      <section className="bmi-section">
        <div className="bmi-card">
          <h2 className="bmi-card-title">Your Results</h2>

          <div className="bmi-result">
            <div className="bmi-result-row">
              <span>BMI</span>
              <strong>{formatNumber(bmi, 1)}</strong>
            </div>
            <div className="bmi-result-row">
              <span>Category</span>
              <strong style={{ color: cat?.color || '#0f172a' }}>{cat?.name || '-'}</strong>
            </div>
          </div>

          <div className="bmi-meter">
            <div className="bmi-meter-track">
              {categories.map((c, i) => (
                <div key={i} className="bmi-meter-seg" style={{ background: c.color }} />
              ))}
              {bmi > 0 && (
                <div
                  className="bmi-meter-pointer"
                  title={`BMI ${formatNumber(bmi,1)}`}
                  style={{
                    left: `${Math.max(0, Math.min(100, (bmi / 40) * 100))}%`
                  }}
                />
              )}
            </div>
            <div className="bmi-meter-labels">
              <span>Under</span>
              <span>Normal</span>
              <span>Over</span>
              <span>Obese</span>
            </div>
          </div>

          {healthyWeightRange && heightM > 0 && (
            <div className="bmi-info">
              <div className="bmi-info-row"><span>Healthy BMI Range</span><strong>18.5 – 24.9</strong></div>
              <div className="bmi-info-row">
                <span>Healthy Weight Range</span>
                <strong>
                  {formatWeight(healthyWeightRange.minKg)} – {formatWeight(healthyWeightRange.maxKg)}
                </strong>
              </div>
            </div>
          )}

          <div className="bmi-field bmi-target">
            <label className="bmi-label">Target BMI (optional)</label>
            <input className="bmi-input" type="number" min="10" max="40" step="0.1"
              value={targetBmi} onChange={(e)=>setTargetBmi(e.target.value)} />
          </div>

          {targetWeight && heightM > 0 && (
            <div className="bmi-target-row">
              <span>Weight for BMI {formatNumber(targetBmi,1)}</span>
              <strong>{formatWeight(targetWeight)}</strong>
            </div>
          )}

          <p className="bmi-note">
            BMI is a general guide and may not reflect body composition for athletes, elderly, or some populations.
            For personal advice, consult a healthcare professional.
          </p>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default BMI;
