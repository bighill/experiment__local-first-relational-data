import React from 'react'
import styles from './Card.module.css'

interface CardProps {
  title: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Card
