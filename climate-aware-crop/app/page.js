'use client'

import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1>Climate-Aware Crop Stress Monitoring System</h1>
        <p>Monitor and manage crop stress conditions across your agricultural fields</p>
        
        <div className={styles.actions}>
          <Link href="/login" className={styles.primaryBtn}>
            Get Started
          </Link>
          <Link href="/dashboard" className={styles.secondaryBtn}>
            View Dashboard
          </Link>
        </div>
      </div>

      <section className={styles.features}>
        <h2>Key Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>Real-Time Monitoring</h3>
            <p>Track crop stress levels across multiple fields in real-time</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Climate Integration</h3>
            <p>Weather-aware stress prediction using climate data</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Actionable Insights</h3>
            <p>Receive recommendations to prevent crop damage</p>
          </div>
        </div>
      </section>
    </main>
  )
}
