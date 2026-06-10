// StatsSection.jsx
export default function StatsSection() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50  p-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-8">
        <div>
          <div className="flex items-center gap-2 justify-center">
            <div className="text-4xl font-bold text-gray-900">4.9</div>
            <div>
              <div className="flex gap-0.5">
                {renderStars(5)}
              </div>
              <div className="text-gray-600 text-sm">Based on 1,234 reviews</div>
            </div>
          </div>
        </div>
        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
        <div>
          <div className="text-2xl font-bold text-gray-900">98%</div>
          <div className="text-gray-600 text-sm">Would recommend to others</div>
        </div>
        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
        <div>
          <div className="text-2xl font-bold text-gray-900">5000+</div>
          <div className="text-gray-600 text-sm">Happy wholesalers</div>
        </div>
      </div>
    </div>
  );
}

function renderStars(rating) {
  return Array(5).fill(0).map((_, i) => (
    <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));
}