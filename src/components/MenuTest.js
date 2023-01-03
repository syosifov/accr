import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

function MenuTest() {
  const [ancorElement, setancorElement] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setancorElement(null);
    setOpen(false);
  }

  const handleClick = (e) => {
    setancorElement(e.currentTarget);
    setOpen(true);
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClick}>Open Menu</Button>
      
      <Menu 
        anchorEl={ancorElement} 
        open={open}
        onClose={handleClose}  
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Balance</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <Button variant='outlined' onClick={handleClick}>Open Menu Again</Button>
    </div>
  )
}

export default MenuTest