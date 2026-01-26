"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Capa de fondo base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Gradientes animados */}
      <div className="absolute inset-0">
        <div className="gradient-orb-1" />
        <div className="gradient-orb-2" />
        <div className="gradient-orb-3" />
        <div className="gradient-orb-4" />
      </div>
      
      {/* Capa de ruido sutil para textura */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
