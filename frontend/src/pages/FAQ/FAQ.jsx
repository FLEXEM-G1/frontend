import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './FAQ.css';
import 'react-accessible-accordion/dist/fancy-example.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { question: '¿Qué es el TCEA?', answer: 'El TCEA (Tasa de Costo Efectivo Anual) es una medida del costo total de un crédito expresado en términos anuales.' },
        { question: '¿Cómo se calcula el TCEA?', answer: 'El TCEA se calcula considerando todos los costos y gastos asociados al crédito, incluyendo intereses, comisiones y otros cargos.' },
        { question: '¿Cómo calculo el TCEA de un portafolio?', answer: 'Para calcular el TCEA, selecciona un portafolio y utiliza el simulador de TCEA disponible en la página del portafolio.' },
        { question: '¿Qué es el monto neto descontado?', answer: 'El monto neto descontado es el monto total que se descuenta de una factura o letra, incluyendo intereses y otros cargos.' },
        { question: '¿Cuáles son las tasas de interés aplicables?', answer: 'Las tasas de interés aplicables varían según el tipo de crédito y el plazo de pago. Para más información, consulta con tu banco.' },
    ];

    const handleToggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="faq-container">
            <Sidebar />
            <div className="faq-content">
                <h1>Preguntas Frecuentes</h1>
                <Accordion allowZeroExpanded>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} className="faq-item">
                            <AccordionItemHeading>
                                <AccordionItemButton
                                    className={`faq-question ${openIndex === index ? 'expanded' : ''}`}
                                    onClick={() => handleToggle(index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="faq-icon">
                                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                                    </span>
                                </AccordionItemButton>

                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p className="faq-answer">{faq.answer}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQ;
