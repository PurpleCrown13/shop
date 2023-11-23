import React from 'react';
import { Overlay, Container, Title, Text } from '@mantine/core';
import './HeroContentLeft.css';
import { Link } from 'react-router-dom';

export function HeroContentLeft() {
    return (
        <div className="hero">
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className="container" size="md">
                <Title className="title">Welcome to Shop</Title>
                <Text className="description" size="xl" mt="xl">
                    where royalty meets fashion! Immerse yourself in a realm of boundless elegance and impeccable style. Our curated selection of apparel seamlessly merges timeless classics with the latest trends, promising to redefine your wardrobe. Whether you're preparing for a regal event or embracing everyday grandeur, allow us to accompany you on this voyage of self-discovery.
                </Text>

                <Link to={`/user`} className='mainn-button'>
                    Sign in
                </Link>
            </Container>
        </div>
    );
}