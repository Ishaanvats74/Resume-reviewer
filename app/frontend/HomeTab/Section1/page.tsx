'use client';
import { motion } from "framer-motion";
import React from 'react'
import BlurText from "../../Components/blurText/BlurText";


const Section1 = () => {
  return (
    <section className="snap-start h-screen firstBackground flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }} 
          className="text-5xl text-white"
        >
          <BlurText
            text="Isn't this so cool?!"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </motion.h1>
      </section>
  )
}

export default Section1
