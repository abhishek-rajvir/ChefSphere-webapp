import React from 'react'

import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{textAlign:'center'}}><br/>404 Not Found Invalid URL
      {/* Doesnt refresh the whole page only navigates page with js */}
      <Link to='/'>, redirct to home-page</Link>
    </div>
  )
}
