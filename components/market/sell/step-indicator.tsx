interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export function StepIndicator( {currentStep, totalSteps}: StepIndicatorProps) {
    return (
        <span className="text-lg text-bold tracking-tight">
            Step {currentStep}/{totalSteps}
        </span>
    )
}