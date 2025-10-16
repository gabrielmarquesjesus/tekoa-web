import React from 'react';
import type { StatusMessage } from '../models/StatusMessage';

interface AlertProps extends StatusMessage {}

export default function Alert({ type, text }: AlertProps) {
    return (
        <div
            role="alert"
            className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'} mb-4 transition-all absolute top-4 left-1/2 transform -translate-x-1/2`}
        >
            <span>{text}</span>
        </div>
    )
}