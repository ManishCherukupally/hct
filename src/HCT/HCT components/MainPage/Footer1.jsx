import { Button, Container, Footer, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import facebookImage from '../../../assets/facebook-logo-facebook-icon-transparent-free-png.png';
import instagramImage from '../../../assets/colored-instagram-logo-new.png';
import { useMediaQuery } from '@mantine/hooks';

const Footer1 = ({ openModal }) => {
    const isMobile = useMediaQuery('(max-width: 800px)');
    

    return (
        <Footer
            zIndex='revert'
            style={{
                backgroundColor: '#FBD40B',
                minHeight: '9rem',
                display: 'flex',
                alignItems: 'center',
                display: 'flex',
                position:'relative',
                top: isMobile? '-3rem':'-5rem'
            }}
        >
            <Container
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'row',
                    alignItems: 'center',
                    justifyContent:  'space-between',
                    width: '100%',
                    padding: '1rem',
                    gap: isMobile ? '1rem' : '0',
                }}
            >
                {!isMobile && <Text>Copyrights @ Health Coach SaiTeja 2022</Text>}
                {/* Social Media Links */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        flexDirection: isMobile ? 'row' : 'row',
                    }}
                >
                    <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={facebookImage}
                            alt="Facebook"
                            style={{ width: '4.5rem', height: 'auto' }}
                        />
                    </Link>
                    <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={instagramImage}
                            alt="Instagram"
                            style={{ width: '2.5rem', height: 'auto' }}
                        />
                    </Link>
                </div>

                {/* Register Button */}
                <Button
                    radius="xl"
                    size="xl"
                    style={{
                        background: 'linear-gradient(90deg, #1F3469, #4A90E2, #1F3469)',
                        backgroundSize: '200% 100%',
                        color: 'white',
                        padding: '1rem 2.5rem',
                        fontSize: '18px',
                        fontWeight: 700,
                        borderRadius: '30px',
                        boxShadow: '0 0 20px rgba(255, 253, 208, 0.8)',
                        transition: 'transform 0.3s ease, background-position 0.5s ease-in-out',
                        cursor: 'pointer',
                        backgroundPosition: '0% 50%',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundPosition = '100% 50%')}
                    onMouseLeave={(e) => (e.target.style.backgroundPosition = '0% 50%')}
                    onClick={openModal}
                >
                    Register Here
                </Button>

            </Container>
        </Footer>
    );
};

export default Footer1;
