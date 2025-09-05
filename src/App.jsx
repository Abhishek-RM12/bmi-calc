import { useState } from 'react'

export default function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const calc = (e) => {
    e.preventDefault()
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w) return
    const value = w / ((h / 100) ** 2)
    const rounded = Math.round(value * 10) / 10
    setBmi(rounded)
    let c = ''
    if (rounded < 18.5) c = 'Underweight'
    else if (rounded < 25) c = 'Normal'
    else if (rounded < 30) c = 'Overweight'
    else c = 'Obese'
    setCategory(c)
  }

  const reset = () => { setHeight(''); setWeight(''); setBmi(null); setCategory('') }

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>BMI Calculator</h1>
      <form onSubmit={calc}>
        <div>
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={e=>setHeight(e.target.value)} />
        </div>
        <div>
          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} />
        </div>
        <button type="submit">Calculate</button>
        <button type="button" onClick={reset}>Reset</button>
      </form>
      {bmi && (
        <div>
          <p>BMI: {bmi}</p>
          <p>Category: {category}</p>
        </div>
      )}
    </div>
  )
}
