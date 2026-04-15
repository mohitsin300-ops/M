'use client'

import { motion } from 'framer-motion';

export default function RefundPolicy() {
    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3rem', marginBottom: '1rem' }}
                >
                    Refund Policy
                </motion.h1>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <div style={{ background: 'var(--glass-bg)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>1. General Policy</h2>
                    <p>
                        MJ Tech Global provides digital services and content. Due to the nature of digital delivery,
                        refunds are generally limited once access is granted, unless otherwise required by applicable law.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>2. Subscription Charges</h2>
                    <p>
                        Subscription charges are billed as per the selected plan cycle. Auto-renewal can be canceled for
                        future billing cycles before renewal date. Already processed recurring payments are normally non-refundable,
                        except in verified duplicate charge, technical failure, or legal entitlement cases.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>3. Eligible Refund Scenarios</h2>
                    <p>
                        Refund requests may be considered in cases such as duplicate payment, accidental multiple debit,
                        failed service provisioning, or payment captured but service not activated within a reasonable period.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>4. Non-Refundable Cases</h2>
                    <p>
                        Refunds are typically not provided for partial usage, change of mind, inactivity,
                        account suspension due to policy violation, or missed cancellation before renewal.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>5. Request Timeline</h2>
                    <p>
                        Refund requests should be raised within 7 days of the relevant transaction,
                        along with payment reference, registered email, and issue details.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>6. Processing Time</h2>
                    <p>
                        Approved refunds are initiated to the original payment method. Final credit timeline depends on
                        bank or payment gateway and may take 5 to 10 business days.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>7. Contact for Refund Support</h2>
                    <p>
                        Email refund requests to <strong>mjtechglobal@zohomail.in</strong> or <strong>mjtechbharat@gmail.com</strong>
                        with subject line: Refund Request - App Name.
                    </p>
                </div>
            </section>
        </main>
    );
}
