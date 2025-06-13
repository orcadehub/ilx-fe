// components/InfluencerProfile.js
import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const InfluencerProfile = ({ influencer, onBack, onShowPrices }) => {
  return (
    <Card className="p-4 shadow-sm border-0 rounded-4 bg-white">
      <div className='d-flex justify-content-between align-items-start mb-4'>
        <Button variant="outline-secondary" onClick={onBack} className="rounded-pill px-3 py-1" size="sm">
          ← Back
        </Button>
      </div>
      <div className="d-flex align-items-center flex-wrap gap-4">
        <Image src={influencer.image} roundedCircle width={90} height={90} className="shadow" />
        <div>
          <h4>{influencer.name}</h4>
          <div className="d-flex flex-wrap mb-3 fs-6 gap-3 text-muted">
            {influencer.followers.instagram && (
              <span><FaInstagram className='me-1' /> {influencer.followers.instagram}</span>
            )}
            {influencer.followers.facebook && (
              <span><FaFacebook className='me-1' /> {influencer.followers.facebook}</span>
            )}
            {influencer.followers.youtube && (
              <span><FaYoutube className='me-1' /> {influencer.followers.youtube}</span>
            )}
            {influencer.followers.twitter && (
              <span><FaTwitter className='me-1' /> {influencer.followers.twitter}</span>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" size='sm' className='px-3'>Services</Button>
            <Button
              variant="outline-success"
              size="sm"
              className="px-3"
              onClick={onShowPrices}
            >
              Prices
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InfluencerProfile;
