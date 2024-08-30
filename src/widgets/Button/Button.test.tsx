import { render, screen } from '@testing-library/react';
import Button from "./Button";

describe('UNIT | Button component', () => {
    it('should render primary button if appearance is primary', () => {
        render(<Button appearance="primary" testId="test">click me</Button>);

        expect(screen.getByTestId('btn-primary-test')).toBeInTheDocument();
    });

    it('should render secondary button if appearance is secondary', () => {
        render(<Button appearance="secondary" testId="test">click me</Button>);

        expect(screen.getByTestId('btn-secondary-test')).toBeInTheDocument();
    });

    it('should render primary button if appearance is not passed as default appearance', () => {
        render(<Button testId="test">click me</Button>);

        expect(screen.getByTestId('btn-primary-test')).toBeInTheDocument();
    });
})