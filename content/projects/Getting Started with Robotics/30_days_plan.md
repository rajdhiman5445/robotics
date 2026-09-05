---
title: 30 days of starting with Robotics Plan
---

Here's the path I'd give a CS student starting from **zero electronics**.

## 🤖 30-day CS → Robotics plan

**Goal:** At the end of 30 days, you have a small autonomous robot that can sense obstacles and drive around.

### Week 1 — "What is electricity?"

**Day 1:** Voltage, current, resistance, ground
**Day 2:** Breadboards + multimeter
**Day 3:** LEDs + resistors
**Day 4:** Buttons + pull-up/pull-down
**Day 5:** Potentiometer + analog input
**Day 6:** Digital vs analog signals
**Day 7:** Mini project: **button-controlled LED**

Don't worry about Ohm's law beyond understanding:

> **V = I × R**

You don't need electrical-engineering depth yet.

---

### Week 2 — "Make software touch the real world"

Get an **Arduino-compatible board**.

**Day 8:** Arduino programming environment
**Day 9:** GPIO — inputs and outputs
**Day 10:** PWM — control brightness/speed
**Day 11:** Read a sensor
**Day 12:** Servo motor
**Day 13:** Ultrasonic distance sensor
**Day 14:** Mini project: **parking sensor**

Something like:

```text
Object
  ↓
HC-SR04
  ↓
Arduino
  ↓
Distance calculation
  ↓
LED / buzzer
```

Now you're officially doing robotics. 😎

---

### Week 3 — Motors

This is the fun week.

**Day 15:** DC motors
**Day 16:** Why Arduino can't directly power motors
**Day 17:** Motor drivers
**Day 18:** Forward/backward
**Day 19:** Speed control
**Day 20:** Two motors + differential drive
**Day 21:** Put it on wheels

You'll have:

```text
        Arduino
       /        \
      /          \
Motor Driver   Sensor
   /    \
  🚗    🚗
```

And you'll discover that **"make the robot go straight"** is considerably harder than it sounds. 😂

That's good.

---

### Week 4 — Your first actual robot

**Day 22:** Assemble chassis
**Day 23:** Battery/power management
**Day 24:** Read distance while driving
**Day 25:** Stop when obstacle detected
**Day 26:** Turn around obstacles
**Day 27:** Tune behavior
**Day 28:** Clean up wiring/code
**Day 29:** Autonomous testing
**Day 30:** 🎉 **Obstacle-avoiding robot**

Your final architecture:

```text
             👁️
         Ultrasonic
             │
             ▼
       ┌───────────┐
       │  Arduino  │
       └─────┬─────┘
             │
             ▼
       Motor Driver
          ↙     ↘
       Motor   Motor
         O       O
          \     /
           🤖
```

---

## 🛒 Your initial shopping list

I'd keep your first purchase around **₹1,500–₹2,500** rather than buying a giant kit.

**Electronics**

* Arduino UNO-compatible board
* Breadboard
* Jumper wires
* Resistor assortment
* LEDs
* Push buttons
* Potentiometer
* HC-SR04 ultrasonic sensor
* Small servo
* Buzzer
* Multimeter

**Robot parts**

* 2 × TT geared DC motors
* 2 × wheels
* 1 × caster wheel
* L298N or similar motor driver
* Simple 2WD chassis
* Battery holder
* Appropriate batteries

You can get these from Indian electronics/robotics suppliers such as [Robu.in](https://robu.in/?utm_source=chatgpt.com), and many of the individual components are also readily available through Indian marketplaces.

### One important rule

**Don't buy the robot first.**

Buy the electronics for **Week 1–2**, learn them, and *then* buy the motors/chassis.

You'll understand what you're buying by the time you get there.

---

## And after these 30 days...

This is where it gets really interesting for someone with CS experience:

**Arduino**
→ **ESP32**
→ **Python**
→ **ROS 2**
→ **Linux**
→ **Gazebo**
→ **OpenCV**
→ **SLAM**
→ **robot navigation**
→ **computer vision**
→ **AI/ML**
→ eventually **robot arms / humanoids / autonomous robots**


