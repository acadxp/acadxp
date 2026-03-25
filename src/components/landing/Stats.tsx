export default function Stats() {
  return (
    <section className="py-24 border-y border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        {[
          { label: "Active Students", value: "50,000+" },
          { label: "Challenges Solved", value: "1.2M" },
          { label: "Platform Satisfaction", value: "4.8/5" },
        ].map((stat) => (
          <div key={stat.label}>
            <span className="text-5xl font-black text-[#111110] block mb-3 tracking-tighter">
              {stat.value}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8a7a2]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
