// frontend/src/components/Portfolio/PortfolioList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Portfolio from './Portfolio.jsx';

const PortfolioList = ({ portfolios, onDelete, openTceaModal, tceaResults, netDiscountedAmount }) => {
    if (!portfolios || portfolios.length === 0) {
        return <p>No hay portafolios disponibles</p>;
    }

    return (
        <div className="portfolio-list">
            {portfolios.map((portfolio) => (
                portfolio && portfolio._id ? (
                    <Portfolio
                        key={portfolio._id}
                        portfolioId={portfolio._id}
                        bankName={portfolio.name}
                        bankCurrency={portfolio.currency}
                        tcea={tceaResults[portfolio._id]}
                        netDiscountedAmount={netDiscountedAmount[portfolio._id]}
                        openTceaModal={openTceaModal}
                        onDelete={onDelete}
                        openWarningModal={onDelete}
                    />
                ) : (
                    <p key={Math.random()}>Información inválida del portafolio</p>
                )
            ))}
        </div>
    );
};

PortfolioList.propTypes = {
    portfolios: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    openTceaModal: PropTypes.func.isRequired,
    tceaResults: PropTypes.object.isRequired,
    netDiscountedAmount: PropTypes.object.isRequired
};

export default PortfolioList;