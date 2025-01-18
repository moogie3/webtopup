import React from 'react'

export interface InputProps {
    label: string;
    value?: string;
    disabled?: boolean; // ✅ Ensure `disabled` prop exists
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input(props: InputProps) {
    const { label, ...nativeProps } = props;
    return (
        <>
            <label htmlFor="phone" className="form-label text-lg fw-medium color-palette-1 mb-10">{label}</label>
            <input type="tel" className="form-control rounded-pill text-lg" id="phone" name="phone"
                aria-describedby="phone" placeholder="Enter your phone number" {...nativeProps} />
        </>
    )
}
