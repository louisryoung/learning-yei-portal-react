import { BanIcon, FireIcon } from '@heroicons/react/outline'
import React, { useEffect, useState, useMemo } from 'react'

function Streak({ allIndividualData }) {
  const [streak, setStreak] = useState(0)
  let dates = useMemo(() => [], [])

  useEffect(() => {
    let streakCount = 0
    if (allIndividualData) {
      allIndividualData.forEach((item) => {
        const item_date = new Date(item.createdAt)
        dates.push(
          Math.floor(
            Math.abs(
              new Date().getTime() -
                new Date(
                  `${
                    item_date.getMonth() + 1
                  }/${item_date.getDate()}/${item_date.getFullYear()}`
                ).getTime()
            ) /
              (1000 * 60 * 60 * 24)
          )
        )
      })
      // console.log(dates.filter((value, index) => dates.indexOf(value) === index))
      dates
        .filter((value, index) => dates.indexOf(value) === index) // removes duplicates
        .sort((a, b) => a - b) // sorts from smallest to largest
        .forEach((item) => {
          // counts up consecutive numbers to create a streak
          streakCount += item === streakCount ? 1 : 0
        })

      setStreak(streakCount)
    }
  }, [allIndividualData, dates])
  return (
    <>
      {allIndividualData && streak && streak !== 0 ? (
        <div className="mb-4 flex items-center space-x-2 py-2 px-3 w-min bg-orange-300 text-orange-900 rounded-full">
          <FireIcon className="h-5 w-5" />
          <span className="whitespace-nowrap pr-1 font-medium text-sm">
            {streak}x Day Streak
          </span>
        </div>
      ) : (
        <div className="mb-4">
          <div className="mb-2 flex items-center space-x-2 py-2 px-3 w-min bg-gray-300 text-gray-900 rounded-full">
            <BanIcon className="h-5 w-5" />
            <span className="whitespace-nowrap pr-1 font-medium text-sm">
              No streak.
            </span>
          </div>
          <p className="text-xs italic">
            You can start your streak back up by learning something today.
          </p>
        </div>
      )}
    </>
  )
}

export default Streak
