import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown, Trophy, Heart, Save, Upload } from 'lucide-react'
import { motion } from 'framer-motion'

function App() {
  const [scores, setScores] = useState({
    you: 0,
    her: 0
  })

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('gymScores')
    if (savedScores) {
      setScores(JSON.parse(savedScores))
    }
  }, [])

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    localStorage.setItem('gymScores', JSON.stringify(scores))
  }, [scores])

  const updateScore = (person, change) => {
    setScores(prev => ({
      ...prev,
      [person]: Math.max(0, prev[person] + change)
    }))
  }

  // Save scores to CSV file
  const saveToCSV = () => {
    const currentDate = new Date().toISOString().split('T')[0]
    const csvContent = `Date,You,Her\n${currentDate},${scores.you},${scores.her}`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gym-scores-${currentDate}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  // Load scores from CSV file
  const loadFromCSV = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target.result
        const lines = csv.split('\n')
        if (lines.length > 1) {
          const data = lines[1].split(',') // Skip header, get data
          if (data.length >= 3) {
            setScores({
              you: parseInt(data[1]) || 0,
              her: parseInt(data[2]) || 0
            })
          }
        }
      }
      reader.readAsText(file)
    }
    // Reset file input
    event.target.value = ''
  }

  const ScoreCard = ({ person, score, name, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
        minWidth: '280px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <Icon style={{ width: '32px', height: '32px', color: '#ffffff', marginRight: '12px' }} />
        <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', margin: 0 }}>{name}</h2>
      </div>
      
      <motion.div
        key={score}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '24px',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
        }}
      >
        {score}
      </motion.div>
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateScore(person, 1)}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          <ArrowUp style={{ width: '20px', height: '20px' }} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateScore(person, -1)}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          <ArrowDown style={{ width: '20px', height: '20px' }} />
        </motion.button>
      </div>
    </motion.div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px'
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          marginBottom: '16px'
        }}
      >
        🏋️ Gym Scoreboard
      </motion.h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '800px'
      }}>
        <ScoreCard person="you" score={scores.you} name="You" icon={Trophy} />
        <ScoreCard person="her" score={scores.her} name="Her" icon={Heart} />
      </div>

      {/* CSV Save/Load Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '24px'
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveToCSV}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Save style={{ width: '16px', height: '16px' }} />
          Save to CSV
        </motion.button>

        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Upload style={{ width: '16px', height: '16px' }} />
          Load from CSV
          <input
            type="file"
            accept=".csv"
            onChange={loadFromCSV}
            style={{ display: 'none' }}
          />
        </motion.label>
      </motion.div>
    </div>
  )
}

export default App
