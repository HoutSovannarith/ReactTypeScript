
import { Button, Spinner } from 'flowbite-react';

export default function SpinnerComponent() {
    return (
        <div className="flex flex-row gap-3">
            <Button>
                <Spinner aria-label="Spinner button example" size="xl" />
                <span className="pl-3">Loading...</span>
            </Button>
        </div>
    );
}
