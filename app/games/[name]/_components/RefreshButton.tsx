'use client'

import React from 'react'

export default function RefreshButton() {
  function refresh() {
    window.location.reload();
  }
  return (
    <button className='px-2 py-1 border rounded text-xs' onClick={refresh}>refresh</button>
  )
}
