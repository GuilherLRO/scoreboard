import { useState } from 'react'
import { ArrowUp, ArrowDown, Trophy, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

function App() {
  const [scores, setScores] = useState({
    you: 0,
    her: 0
  })

  const updateScore = (person, change) => {
    setScores(prev => ({
      ...prev,
      [person]: Math.max(0, prev[person] + change)
    }))
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
        textAlign: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <Icon size={32} color="white" style={{ marginRight: '12px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>{name}</h2>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <motion.div
          key={score}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1
          }}
        >
          {score}
        </motion.div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateScore(person, -1)}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '12px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
        >
          <ArrowDown size={24} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateScore(person, 1)}
          style={{
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '12px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>
    </motion.div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}
      >
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '8px',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
        }}>
          Gym Scoreboard
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '18px'
        }}>
          Track your fitness journey together!
        </p>
      </motion.div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        maxWidth: '800px',
        width: '100%'
      }}>
        <ScoreCard 
          person="you" 
          score={scores.you} 
          name="You" 
          icon={Trophy}
        />
        <ScoreCard 
          person="her" 
          score={scores.her} 
          name="Her" 
          icon={Heart}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          marginTop: '32px',
          textAlign: 'center'
        }}
      >
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '14px'
        }}>
          Keep pushing each other! 💪
        </p>
      </motion.div>
    </div>
  )
}

export default App
