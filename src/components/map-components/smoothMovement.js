import React, { useEffect, useState } from 'react'

// LEAFLET
import L from 'leaflet'
import 'leaflet.motion/dist/leaflet.motion'
import { Marker, useMap } from 'react-leaflet'

const SmoothMovingMarker = ({ nextPosition, duration }) => {
  // CONTEXT
  const mapContext = useMap()

  // STATE
  const [prevPosition, setPrevPosition] = useState(nextPosition)
  const [isMoving, setIsMoving] = useState(false)

  // ICON
  const iconCar = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Circle-icons-car-custom.svg/1200px-Circle-icons-car-custom.svg.png',
    iconSize: L.point(30, 30)
  })

  // SIDE EFFECT LEAFLET MOTION
  useEffect(() => {
    if(
      prevPosition[0] !== nextPosition[0]
      && prevPosition[1] !== nextPosition[1]
    ) {
      setIsMoving(true)
      setPrevPosition(nextPosition)

      // CREATE ANIM MOVING
      L.motion.polyline([prevPosition, nextPosition], {
        color: 'red',
        weight: 6
      }, {
        auto: true,
        duration: duration,
        easing: L.Motion.Ease.linear
      }, {
        removeOnEnd: true,
        showMarker: true,
        icon: iconCar
      }).addTo(mapContext)

      // FOLLOW MARKER
      mapContext.setView(nextPosition, mapContext.getZoom())
    } else {
      setIsMoving(false)
    }

  }, [nextPosition])

  return (
    !isMoving && <Marker
      position={prevPosition}
      icon={iconCar}
    />
  )
}

export default SmoothMovingMarker