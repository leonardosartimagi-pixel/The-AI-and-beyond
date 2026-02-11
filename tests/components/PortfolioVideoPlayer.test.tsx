import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PortfolioVideoPlayer } from '@/components/ui/PortfolioVideoPlayer';

// Mock HTMLMediaElement.play (not implemented in jsdom)
beforeEach(() => {
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = vi.fn();
});

const defaultProps = {
  imageSrc: '/images/portfolio/consulting.webp',
  videoSrc: '/videos/portfolio/consulting.mp4',
  videoWebmSrc: '/videos/portfolio/consulting.webm',
  alt: 'Test Project Title',
  prefersReducedMotion: false,
};

describe('PortfolioVideoPlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.pause = vi.fn();
  });

  it('renders the static image', () => {
    render(<PortfolioVideoPlayer {...defaultProps} />);

    const image = screen.getByAltText('Test Project Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/portfolio/consulting.webp');
  });

  it('renders video element when prefersReducedMotion is false', () => {
    const { container } = render(<PortfolioVideoPlayer {...defaultProps} />);

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('does not render video when prefersReducedMotion is true', () => {
    const { container } = render(
      <PortfolioVideoPlayer {...defaultProps} prefersReducedMotion={true} />
    );

    const video = container.querySelector('video');
    expect(video).not.toBeInTheDocument();
  });

  it('video has correct attributes for autoplay loop', () => {
    const { container } = render(<PortfolioVideoPlayer {...defaultProps} />);

    const video = container.querySelector('video') as HTMLVideoElement;
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('aria-label', 'Test Project Title');
    // muted is a DOM property in React, not an HTML attribute
    expect(video.muted).toBe(true);
  });

  it('provides WebM and MP4 sources in correct order', () => {
    const { container } = render(<PortfolioVideoPlayer {...defaultProps} />);

    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute(
      'src',
      '/videos/portfolio/consulting.webm'
    );
    expect(sources[0]).toHaveAttribute('type', 'video/webm');
    expect(sources[1]).toHaveAttribute(
      'src',
      '/videos/portfolio/consulting.mp4'
    );
    expect(sources[1]).toHaveAttribute('type', 'video/mp4');
  });

  it('renders only image when prefersReducedMotion is true', () => {
    const { container } = render(
      <PortfolioVideoPlayer {...defaultProps} prefersReducedMotion={true} />
    );

    const image = screen.getByAltText('Test Project Title');
    expect(image).toBeInTheDocument();

    const video = container.querySelector('video');
    expect(video).not.toBeInTheDocument();
  });
});
