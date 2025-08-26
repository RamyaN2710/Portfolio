import React from 'react';
import { render, screen } from '@testing-library/react';
import Portfolio from '../Portfolio';
import { PortfolioTestIds } from '../__testids__/Portfolio.ids';
import { PERSON, SKILLS, PROJECTS } from '../../data/portfolioData';

describe('Portfolio', () => {
  it('renders without crashing', () => {
    render(<Portfolio />);
    expect(screen.getByTestId(PortfolioTestIds.container)).toBeInTheDocument();
  });

  describe('Hero Section', () => {
    it('displays level and XP', () => {
      render(<Portfolio />);
      const levelText = screen.getByText(`Lvl ${PERSON.achievements[0].progress}`);
      const xpText = screen.getByText(`${PERSON.achievements[0].progress} XP`);
      
      expect(levelText).toBeInTheDocument();
      expect(xpText).toBeInTheDocument();
    });

    it('displays achievements', () => {
      render(<Portfolio />);
      const achievements = screen.getByTestId(PortfolioTestIds.hero.achievements);
      
      PERSON.achievements.forEach(achievement => {
        expect(achievements).toHaveTextContent(achievement.title);
        expect(achievements).toHaveTextContent(achievement.description);
      });
    });
  });

  describe('Skills Section', () => {
    it('displays skill cards with levels and endorsements', () => {
      render(<Portfolio />);
      screen.getByTestId(PortfolioTestIds.skills.container);
      
      SKILLS.forEach(skill => {
        const skillCard = screen.getByText(skill.label).closest(`[data-testid="${PortfolioTestIds.skills.skillCard}"]`);
        expect(skillCard).toBeInTheDocument();
 
      });
    });
  });

  describe('Projects Section', () => {
    it('displays project cards with difficulty and XP earned', () => {
      render(<Portfolio />);
      screen.getByTestId(PortfolioTestIds.projects.container);
      
      PROJECTS.forEach(project => {
        const projectCard = screen.getByText(project.title).closest(`[data-testid="${PortfolioTestIds.projects.projectCard}"]`);
        expect(projectCard).toBeInTheDocument();
        expect(projectCard).toHaveTextContent(project.difficulty);
        expect(projectCard).toHaveTextContent(`+${project.xpEarned} XP`);
      });
    });

    it('displays project impact metrics', () => {
      render(<Portfolio />);
      
      const checkProjectImpact = (project: typeof PROJECTS[0]) => {
        const projectCard = screen.getByText(project.title).closest(`[data-testid="${PortfolioTestIds.projects.projectCard}"]`);
        const impactSection = projectCard?.querySelector(`[data-testid="${PortfolioTestIds.projects.impact}"]`);
        
        Object.entries(project.impact).forEach(([key, value]) => {
          expect(impactSection).toHaveTextContent(`${key}:`);
          expect(impactSection).toHaveTextContent(value);
        });
      };
      
      PROJECTS.forEach(checkProjectImpact);
    });
  });

  describe('Timeline Section', () => {
    it('displays timeline items with achievements', () => {
      render(<Portfolio />);
      screen.getByTestId(PortfolioTestIds.timeline.container);
      const timelineItems = screen.getAllByTestId(PortfolioTestIds.timeline.timelineItem);
      
      expect(timelineItems.length).toBeGreaterThan(0);
      timelineItems.forEach(item => {
        const achievements = item.querySelector(`[data-testid="${PortfolioTestIds.timeline.achievements}"]`);
        expect(achievements).toBeInTheDocument();
      });
    });
  });
});
