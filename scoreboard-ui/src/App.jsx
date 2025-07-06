import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown, Trophy, Heart, Save, Upload, Edit3 } from 'lucide-react'
import { motion } from 'framer-motion'

function App() {
  const [scores, setScores] = useState({
    you: 0,
    her: 0
  })

  const [names, setNames] = useState({
    you: 'You',
    her: 'Her'
  })

  const [editingName, setEditingName] = useState(null)
  const [tempName, setTempName] = useState('')

  // Load scores and names from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('gymScores')
    const savedNames = localStorage.getItem('gymNames')
    
    if (savedScores) {
      setScores(JSON.parse(savedScores))
    }
    if (savedNames) {
      setNames(JSON.parse(savedNames))
    }
  }, [])

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    localStorage.setItem('gymScores', JSON.stringify(scores))
  }, [scores])

  // Save names to localStorage whenever names change
  useEffect(() => {
    localStorage.setItem('gymNames', JSON.stringify(names))
  }, [names])

  const updateScore = (person, change) => {
    setScores(prev => ({
      ...prev,
      [person]: Math.max(0, prev[person] + change)
    }))
  }

  const startEditingName = (person) => {
    setEditingName(person)
    setTempName(names[person])
  }

  const saveName = () => {
    if (tempName.trim()) {
      setNames(prev => ({
        ...prev,
        [editingName]: tempName.trim()
      }))
    }
    setEditingName(null)
    setTempName('')
  }

  const cancelEditingName = () => {
    setEditingName(null)
    setTempName('')
  }

  const handleNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveName()
    } else if (e.key === 'Escape') {
      cancelEditingName()
    }
  }

  // Save scores to CSV file
  const saveToCSV = () => {
    const currentDate = new Date().toISOString().split('T')[0]
    const csvContent = `Date,${names.you},${names.her}\n${currentDate},${scores.you},${scores.her}`
    
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
          const headers = lines[0].split(',')
          const data = lines[1].split(',')
          
          if (headers.length >= 3 && data.length >= 3) {
            // Update names from CSV headers
            setNames({
              you: headers[1] || 'You',
              her: headers[2] || 'Her'
            })
            
            // Update scores from CSV data
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
        
        {editingName === person ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={saveName}
            onKeyDown={handleNameKeyPress}
            autoFocus
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: '600',
              textAlign: 'center',
              outline: 'none',
              maxWidth: '150px'
            }}
          />
        ) : (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            onClick={() => startEditingName(person)}
          >
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', margin: 0 }}>
              {name}
            </h2>
            <Edit3 style={{ 
              width: '16px', 
              height: '16px', 
              color: 'rgba(255, 255, 255, 0.5)', 
              marginLeft: '8px',
              opacity: 0.7
            }} />
          </div>
        )}
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
        <ScoreCard person="you" score={scores.you} name={names.you} icon={Trophy} />
        <ScoreCard person="her" score={scores.her} name={names.her} icon={Heart} />
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

      {/* Discrete instruction for name editing */}
      {!editingName && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px',
            textAlign: 'center',
            marginTop: '16px'
          }}
        >
          💡 Click on names to edit them
        </motion.p>
      )}
    </div>
  )
}

export default App
