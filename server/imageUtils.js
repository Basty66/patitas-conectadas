import sharp from 'sharp'

export async function extractColors(imagePath) {
  const { data, info } = await sharp(imagePath)
    .resize(50, 50, { fit: 'cover' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = []
  for (let i = 0; i < data.length; i += 3) {
    pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] })
  }

  const quantized = {}
  for (const p of pixels) {
    const key = `${Math.round(p.r / 32) * 32},${Math.round(p.g / 32) * 32},${Math.round(p.b / 32) * 32}`
    quantized[key] = (quantized[key] || 0) + 1
  }

  const sorted = Object.entries(quantized).sort((a, b) => b[1] - a[1])
  const total = pixels.length

  return sorted.slice(0, 5).map(([rgb, count]) => {
    const [r, g, b] = rgb.split(',').map(Number)
    return { rgb: [r, g, b], hex: rgbToHex(r, g, b), weight: count / total }
  })
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('')
}

function colorDistance(c1, c2) {
  const dr = c1[0] - c2[0]
  const dg = c1[1] - c2[1]
  const db = c1[2] - c2[2]
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

export function findMatches(foundPet, lostPets) {
  const foundColors = foundPet.colors ? JSON.parse(foundPet.colors) : []

  return lostPets.map(lost => {
    let score = 0
    const details = []

    if (lost.species === foundPet.species) { score += 30; details.push('Misma especie +30') }

    if (lost.size && foundPet.size && lost.size === foundPet.size) { score += 20; details.push('Mismo tamaño +20') }

    if (lost.breed && foundPet.breed && lost.breed.toLowerCase() === foundPet.breed.toLowerCase()) { score += 25; details.push('Misma raza +25') }

    if (lost.color && foundPet.color) {
      const lc = lost.color.toLowerCase()
      const fc = foundPet.color.toLowerCase()
      if (lc === fc) { score += 15; details.push('Mismo color +15') }
      else if (lc.includes(fc) || fc.includes(lc)) { score += 8; details.push('Color similar +8') }
    }

    if (foundColors.length > 0) {
      try {
        const lostColors = lost.colors ? JSON.parse(lost.colors) : []
        if (lostColors.length > 0) {
          let maxSim = 0
          for (const fc2 of foundColors) {
            for (const lc2 of lostColors) {
              const dist = colorDistance(fc2.rgb, lc2.rgb)
              const sim = Math.max(0, 1 - dist / 442) * 10
              if (sim > maxSim) maxSim = sim
            }
          }
          score += Math.round(maxSim)
          if (maxSim > 5) details.push(`Análisis de color IA: ${Math.round(maxSim)}pts`)
        }
      } catch { }
    }

    return { pet: lost, score: Math.min(score, 100), details }
  })
    .filter(m => m.score >= 35)
    .sort((a, b) => b.score - a.score)
}
