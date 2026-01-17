// Placeholder: Dashboard component
// Main dashboard view showing crop stress data and visualizations

import { useCropData } from '../../hooks/useCropData'
import StressVisualization from './StressVisualization/StressVisualization'

export default function Dashboard() {
  const { crops, stressData, loading, error } = useCropData()

  if (loading) return <div>Loading crops...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h1>Crop Stress Dashboard</h1>
      <div>
        {crops.map((crop) => (
          <div key={crop.id}>
            <h3>{crop.name}</h3>
            <StressVisualization cropId={crop.id} data={stressData[crop.id]} />
          </div>
        ))}
      </div>
    </div>
  )
}
