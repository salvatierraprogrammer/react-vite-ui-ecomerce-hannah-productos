import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import { useCart } from '../context/CartContext'
import logo from '../assets/logo2.png'

export default function Header() {
  const { cart } = useCart()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const categorias = ['Indumentaria', 'Herramientas', 'Artefactos']

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #b3d4fc, #e8b3fc)',
        color: '#222',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        {/* Logo + Marca */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src={logo}
            alt="Hannah Logo"
            sx={{
              width: { xs: 50, md: 70 },
              height: { xs: 50, md: 70 },
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Great Vibes", cursive',
                color: '#222',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              Hannah
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#444',
                letterSpacing: '6px',
                fontWeight: 300,
              }}
            >
              PRODUCTS
            </Typography>
          </Box>
        </Box>

        {/* Botones lado derecho */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              color: 'inherit',
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            aria-label="carrito"
            onClick={() => navigate('/cart')}
            sx={{ color: 'inherit' }}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* Menú desplegable de categorías */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {categorias.map((cat) => (
            <MenuItem
              key={cat}
              onClick={() => {
                navigate(`/categoria/${cat.toLowerCase()}`)
                handleMenuClose()
              }}
            >
              {cat}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
