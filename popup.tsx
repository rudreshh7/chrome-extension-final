import React, { useEffect, useState } from "react"

import "./style.css"

function IndexPopup() {
  const [locationData, setLocationData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true)
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const ipAddress = data.ip

        fetch(`https://ipinfo.io/${ipAddress}/json?token=INSERTHERE`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            setLocationData({
              city: data.city,
              country: data.country
            })
            setIsLoading(false)
          })
      })
  }

  const divStyle = {
    width: "500px",
    height: "500px"
  }

  return (
    <div style={divStyle} className="flex justify-center items-center h-screen">
      <button
        onClick={fetchData}
        className="bg-red-500 text-white py-2 px-4 rounded">
        Show My Location
      </button>
      {isLoading ? (
        <p className="text-blue-700 text-base font-extrabold">Loading...</p>
      ) : (
        locationData && (
          <div>
            <h1 className="text-pink-500 text-lg font-bold">
              Your country is {locationData.country} and city is{" "}
              {locationData.city}
            </h1>
          </div>
        )
      )}
    </div>
  )
}

export default IndexPopup
