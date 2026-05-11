"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Users, Shield, Timer } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { motion, useSpring, useTransform, useInView } from "motion/react"

interface StatsData {
  athletes: number
  teams: number
  meets: number
  races: number
  heats: number
  performances: number
  boats: Record<string, number>
  gender: Record<string, number>
}

function AnimatedCounter({ value }: { value: number }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { bounce: 0, duration: 2000 })
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

  React.useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

const chartConfig = {
  M: { label: "Maschile", color: "var(--color-blue-500)" },
  F: { label: "Femminile", color: "var(--color-pink-500)" },
  X: { label: "Misto", color: "var(--color-purple-500)" },
  K1: { label: "K1", color: "var(--color-cyan-500)" },
  K2: { label: "K2", color: "var(--color-cyan-600)" },
  K4: { label: "K4", color: "var(--color-cyan-700)" },
  C1: { label: "C1", color: "var(--color-orange-500)" },
  C2: { label: "C2", color: "var(--color-orange-600)" },
  C4: { label: "C4", color: "var(--color-orange-700)" },
  other: { label: "Altro", color: "var(--color-gray-500)" },
} satisfies ChartConfig

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }: any) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      className="text-[10px] font-black pointer-events-none"
    >
      {name}
    </text>
  );
};

export function HomeStats({ data }: { data: StatsData }) {
  const genderData = [
    { name: "M", value: data.gender.M, fill: "var(--color-M)" },
    { name: "F", value: data.gender.F, fill: "var(--color-F)" },
    { name: "X", value: data.gender.X, fill: "var(--color-X)" },
  ]

  const boatData = [
    { name: "K1", value: data.boats.K1, fill: "var(--color-K1)" },
    { name: "K2", value: data.boats.K2, fill: "var(--color-K2)" },
    { name: "K4", value: data.boats.K4, fill: "var(--color-K4)" },
    { name: "C1", value: data.boats.C1, fill: "var(--color-C1)" },
    { name: "C2", value: data.boats.C2, fill: "var(--color-C2)" },
    { name: "C4", value: data.boats.C4, fill: "var(--color-C4)" },
    { name: "other", value: data.boats.other, fill: "var(--color-other)" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-20 max-w-5xl mx-auto">
      <div className="lg:col-span-8 aspect-square lg:aspect-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-full max-h-[500px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={boatData}
              dataKey="value"
              nameKey="name"
              innerRadius={0}
              outerRadius="65%"
              stroke="none"
              paddingAngle={2}
              cornerRadius={3}
              labelLine={false}
              label={renderCustomizedLabel}
            />
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              innerRadius="80%"
              outerRadius="100%"
              stroke="none"
              paddingAngle={4}
              cornerRadius={4}
              labelLine={false}
              label={renderCustomizedLabel}
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="flex-1 p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 transition-all hover:border-blue-500/30 hover:bg-white/[0.08] group">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="text-4xl font-black italic tracking-tighter">
              <AnimatedCounter value={data.teams} />
            </div>
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest ml-1">Società</div>
          </div>
          </div>

          <div className="flex-1 p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 transition-all hover:border-cyan-500/30 hover:bg-white/[0.08] group">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-4xl font-black italic tracking-tighter">
              <AnimatedCounter value={data.athletes} />
            </div>
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest ml-1">Atleti</div>
          </div>
          </div>

          <div className="flex-1 p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 transition-all hover:border-purple-500/30 hover:bg-white/[0.08] group">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Timer className="w-7 h-7" />
          </div>
          <div>
            <div className="text-4xl font-black italic tracking-tighter">
              <AnimatedCounter value={data.heats} />
            </div>
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest ml-1">Batterie</div>
          </div>
          </div>
      </div>
    </div>
  )
}
