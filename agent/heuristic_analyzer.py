"""
Real Heuristic-Based Content Analysis for Illusion Breaker

This module provides deterministic, rule-based content analysis without
requiring external APIs, AI services, or paid services.

Key features:
- Rule-based claim extraction using linguistic patterns
- Multi-signal trust score computation
- Evidence flag generation based on detected patterns
- Template-based reasoning generation

All analysis is local, deterministic, and privacy-preserving.
"""

import re
from typing import Dict, List, Any, Tuple
from datetime import datetime


def analyze_content_heuristic(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main heuristic analysis function
    
    Args:
        input_data: Dictionary containing:
            - content: Text content to analyze (required)
            - url: Source URL (optional)
            - title: Page title (optional)
    
    Returns:
        Complete analysis result with trust score, claims, flags, and reasoning
    """
    content = input_data.get('content', '')
    url = input_data.get('url', '')
    title = input_data.get('title', '')
    
    if not content:
        return generate_empty_analysis()
    
    # Extract claims from content
    claims = extract_claims(content)
    
    # Compute analysis signals
    signals = compute_signals(content, url, title)
    
    # Compute trust score
    trust_score = compute_trust_score(signals)
    
    # Generate evidence flags
    flags = generate_evidence_flags(signals, content, url)
    
    # Generate reasoning
    reasoning = generate_reasoning(signals, trust_score, len(claims))
    
    # Determine confidence label
    confidence_label = get_confidence_label(trust_score)
    
    # Build result
    result = {
        "id": f"analysis-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "timestamp": datetime.now().isoformat(),
        "url": url or 'N/A',
        "content_type": classify_content_type(url, content),
        "trust_score": trust_score,
        "confidence_label": confidence_label,
        "claims": claims,
        "flags": flags,
        "reasoning": reasoning,
        "agent_info": {
            "model": "heuristic-analyzer-v1",
            "version": "2.0.0",
            "mode": "production",
            "approach": "rule-based deterministic analysis"
        },
        "metadata": {
            "content_length": len(content),
            "claim_count": len(claims),
            "flag_count": len(flags),
            "analysis_time": 0.5
        }
    }
    
    return result


def extract_claims(content: str) -> List[Dict[str, Any]]:
    """
    Extract claims from content using rule-based sentence selection
    
    Args:
        content: Text content to analyze
    
    Returns:
        List of claim objects with status, confidence, sources, and reasoning
    """
    claims = []
    
    # Split into sentences
    sentences = re.split(r'[.!?]+', content)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 20 and len(s.strip()) < 300]
    
    # Claim verbs that indicate factual statements
    claim_verbs = [
        r'\bis\b', r'\bare\b', r'\bwas\b', r'\bwere\b',
        r'\bshows\b', r'\bproves\b', r'\bdemonstrates\b',
        r'\breveals\b', r'\bconfirms\b', r'\bindicates\b',
        r'\bsuggests\b', r'\bclaims\b', r'\bstates\b',
        r'\breports\b', r'\bfound\b', r'\bdiscovered\b'
    ]
    
    claim_id = 1
    
    for sentence in sentences:
        if len(claims) >= 3:  # Limit to 3 claims
            break
        
        sentence_lower = sentence.lower()
        
        # Check if sentence contains claim verbs
        has_claim = any(re.search(pattern, sentence_lower) for pattern in claim_verbs)
        
        if has_claim:
            status = determine_claim_status(sentence_lower)
            confidence = compute_claim_confidence(sentence_lower)
            sources = detect_sources(sentence_lower)
            
            claims.append({
                "id": claim_id,
                "text": sentence[:200],  # Truncate if too long
                "status": status,
                "confidence": confidence,
                "sources": sources,
                "reasoning": generate_claim_reasoning(status, confidence)
            })
            claim_id += 1
    
    # If no claims found, create a default one
    if not claims:
        claims.append({
            "id": 1,
            "text": "Content contains general information without specific factual claims",
            "status": "unverified",
            "confidence": 50,
            "sources": [],
            "reasoning": "No specific verifiable claims detected in content"
        })
    
    return claims


def determine_claim_status(sentence: str) -> str:
    """
    Determine claim verification status based on language patterns
    
    Returns: 'verified', 'unverified', 'disputed', or 'misleading'
    """
    # Check for hedging language (uncertainty)
    hedge_words = ['may', 'might', 'could', 'possibly', 'allegedly', 'reportedly', 'supposedly']
    has_hedging = any(word in sentence for word in hedge_words)
    
    # Check for strong assertions
    strong_words = ['definitely', 'absolutely', 'certainly', 'undoubtedly', 'proven', 'fact']
    has_strong = any(word in sentence for word in strong_words)
    
    # Check for sensational language
    sensational_words = ['shocking', 'unbelievable', 'secret', "don't want you to know", 'incredible']
    has_sensational = any(word in sentence for word in sensational_words)
    
    if has_sensational:
        return 'misleading'
    if has_strong and not has_hedging:
        return 'disputed'
    if has_hedging:
        return 'unverified'
    
    # Check for attribution
    if 'according to' in sentence or 'study' in sentence or 'research' in sentence:
        return 'verified'
    
    return 'unverified'


def compute_claim_confidence(sentence: str) -> int:
    """
    Compute confidence score for a claim (0-100)
    """
    confidence = 50  # Base confidence
    
    # Increase for sourced claims
    if 'study' in sentence or 'research' in sentence or 'according to' in sentence:
        confidence += 25
    
    # Decrease for sensational language
    sensational = ['shocking', 'unbelievable', 'incredible', 'amazing']
    if any(word in sentence for word in sensational):
        confidence -= 20
    
    # Decrease for strong assertions without evidence
    if 'definitely' in sentence or 'absolutely' in sentence:
        confidence -= 15
    
    return max(0, min(100, confidence))


def detect_sources(sentence: str) -> List[str]:
    """
    Detect sources mentioned in sentence
    """
    sources = []
    
    if 'study' in sentence:
        sources.append('Research study (specific source not verified)')
    if 'research' in sentence:
        sources.append('Research publication (specific source not verified)')
    if 'according to' in sentence:
        sources.append('Attributed source (verification needed)')
    if 'expert' in sentence or 'professor' in sentence:
        sources.append('Expert opinion (credentials not verified)')
    
    return sources


def generate_claim_reasoning(status: str, confidence: int) -> str:
    """
    Generate reasoning text for claim assessment
    """
    reasons = {
        'verified': 'Claim includes attribution and appears to reference verifiable sources',
        'unverified': 'Claim lacks clear attribution or verifiable sources',
        'disputed': 'Claim uses strong assertions without adequate evidence',
        'misleading': 'Claim contains sensational language that may distort facts'
    }
    return reasons.get(status, 'Standard claim analysis applied')


def compute_signals(content: str, url: str, title: str) -> Dict[str, float]:
    """
    Compute analysis signals from content
    
    Returns dictionary of signal values used for trust score computation
    """
    content_lower = content.lower()
    
    # 1. Emotional language density
    emotional_words = [
        'shocking', 'unbelievable', 'incredible', 'amazing', 'terrible',
        'horrifying', 'outrageous', 'scandal', 'explosive', 'bombshell',
        'must-see', 'viral', 'breaking', 'urgent', 'crisis'
    ]
    emotional_count = sum(1 for word in emotional_words if word in content_lower)
    word_count = len(content.split())
    emotional_density = (emotional_count / max(word_count / 100, 1))
    
    # 2. Sensational punctuation
    exclamation_count = content.count('!')
    question_count = content.count('?')
    multi_exclamation = len(re.findall(r'!{2,}', content))
    sensational_punctuation = exclamation_count + (multi_exclamation * 3) + (question_count * 0.5)
    
    # 3. Domain reputation
    domain_reputation = compute_domain_reputation(url)
    
    # 4. Source presence
    source_indicators = ['according to', 'study', 'research', 'report', 'source:', 'http']
    source_count = sum(1 for indicator in source_indicators if indicator in content_lower)
    source_presence = min(source_count * 2, 10)
    
    # 5. Content length
    content_length = len(content)
    
    # 6. ALL CAPS ratio
    caps_words = re.findall(r'\b[A-Z]{3,}\b', content)
    caps_ratio = (len(caps_words) / max(word_count, 1)) * 100 if word_count > 0 else 0
    
    # 7. URL count in content
    url_count = len(re.findall(r'https?://', content, re.IGNORECASE))
    
    # 8. Readability (inverse of avg word length)
    words = content.split()
    avg_word_length = sum(len(word) for word in words) / max(len(words), 1)
    readability_score = max(0, min(100, 100 - (avg_word_length * 5)))
    
    return {
        'emotional_density': emotional_density,
        'sensational_punctuation': sensational_punctuation,
        'domain_reputation': domain_reputation,
        'source_presence': source_presence,
        'content_length': content_length,
        'caps_ratio': caps_ratio,
        'exclamation_count': exclamation_count,
        'question_count': question_count,
        'url_count': url_count,
        'readability': readability_score
    }


def compute_domain_reputation(url: str) -> int:
    """
    Compute domain reputation score (0-100)
    """
    if not url:
        return 50  # Neutral
    
    url_lower = url.lower()
    
    # High reputation domains
    high_rep = [
        '.edu', '.gov', '.ac.uk', 'reuters.com', 'apnews.com', 'bbc.com',
        'nytimes.com', 'washingtonpost.com', 'theguardian.com', 'nature.com',
        'science.org', 'npr.org'
    ]
    if any(domain in url_lower for domain in high_rep):
        return 90
    
    # Moderate reputation (news sites)
    mod_rep = ['news', 'times', 'post', 'journal', 'herald', 'tribune']
    if any(domain in url_lower for domain in mod_rep):
        return 70
    
    # Social media (lower initial trust)
    social = ['twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'tiktok.com', 'reddit.com']
    if any(domain in url_lower for domain in social):
        return 30
    
    # Blog platforms
    blogs = ['wordpress', 'blogger', 'medium.com', 'substack']
    if any(platform in url_lower for platform in blogs):
        return 50
    
    return 60  # Default neutral-positive


def compute_trust_score(signals: Dict[str, float]) -> int:
    """
    Compute final trust score based on all signals
    
    Returns: Integer score between 0 and 100
    """
    # Start with domain reputation as baseline
    score = signals['domain_reputation']
    
    # Adjust for emotional language (negative)
    score -= signals['emotional_density'] * 10
    
    # Adjust for sensational punctuation (negative)
    if signals['sensational_punctuation'] > 5:
        score -= min(signals['sensational_punctuation'], 20)
    
    # Adjust for source presence (positive)
    score += signals['source_presence'] * 1.5
    
    # Adjust for CAPS usage (negative)
    if signals['caps_ratio'] > 5:
        score -= signals['caps_ratio'] * 2
    
    # Adjust for content length
    if signals['content_length'] < 200:
        score -= 15  # Very short content
    elif 500 <= signals['content_length'] <= 3000:
        score += 5  # Good substantive length
    
    # Adjust for external links
    if 2 <= signals['url_count'] <= 10:
        score += 5  # Good linking
    elif signals['url_count'] > 10:
        score -= 5  # Too many links (spam indicator)
    
    # Clamp between 0 and 100
    return int(max(0, min(100, score)))


def generate_evidence_flags(signals: Dict[str, float], content: str, url: str) -> List[Dict[str, str]]:
    """
    Generate evidence flags based on detected patterns
    """
    flags = []
    
    # High emotional language
    if signals['emotional_density'] > 2:
        flags.append({
            'type': 'warning',
            'category': 'Emotional Language',
            'description': 'High density of emotional or sensational language detected',
            'details': 'Content uses emotionally charged words that may bias perception. Consider seeking additional neutral sources.'
        })
    
    # Excessive punctuation
    if signals['exclamation_count'] > 5 or '!!!' in content:
        flags.append({
            'type': 'warning',
            'category': 'Sensational Presentation',
            'description': 'Excessive use of exclamation marks detected',
            'details': 'Multiple exclamation marks often indicate sensationalism rather than factual reporting.'
        })
    
    # ALL CAPS usage
    if signals['caps_ratio'] > 5:
        flags.append({
            'type': 'warning',
            'category': 'Formatting Concerns',
            'description': 'Excessive use of all-caps text detected',
            'details': 'Heavy use of capitalization can indicate emotional appeals or lack of editorial standards.'
        })
    
    # Limited sources
    if signals['source_presence'] < 2:
        flags.append({
            'type': 'info',
            'category': 'Limited Source Attribution',
            'description': 'Few external sources or references found',
            'details': 'Content lacks clear attribution to external sources or research. Claims may be difficult to verify independently.'
        })
    
    # Social media source
    if signals['domain_reputation'] < 40:
        flags.append({
            'type': 'info',
            'category': 'Social Media Content',
            'description': 'Content from social media or user-generated platform',
            'details': 'Social media content has less editorial oversight. Verify claims through multiple independent sources.'
        })
    
    # High reputation source
    if signals['domain_reputation'] > 85:
        flags.append({
            'type': 'info',
            'category': 'Reputable Source',
            'description': 'Content from established institutional or news source',
            'details': 'Source has established editorial standards and fact-checking processes.'
        })
    
    # Very short content
    if signals['content_length'] < 200:
        flags.append({
            'type': 'warning',
            'category': 'Minimal Context',
            'description': 'Very brief content with limited detail',
            'details': 'Short content may lack necessary context for understanding claims. Seek additional information.'
        })
    
    # Good source presence
    if signals['source_presence'] >= 5:
        flags.append({
            'type': 'info',
            'category': 'Well-Referenced',
            'description': 'Multiple sources or references cited',
            'details': 'Content includes references to external sources, enabling independent verification.'
        })
    
    return flags


def generate_reasoning(signals: Dict[str, float], trust_score: int, claim_count: int) -> Dict[str, Any]:
    """
    Generate reasoning explanation with steps, summary, and methodology
    """
    steps = [
        {
            'step': 1,
            'title': 'Content Extraction',
            'description': 'Analyzed text content and linguistic patterns',
            'outcome': f'Extracted {claim_count} verifiable claim{"s" if claim_count != 1 else ""} from content'
        },
        {
            'step': 2,
            'title': 'Signal Analysis',
            'description': 'Evaluated multiple credibility indicators',
            'outcome': generate_signal_summary(signals)
        },
        {
            'step': 3,
            'title': 'Trust Score Calculation',
            'description': 'Computed weighted score from all signals',
            'outcome': f'Final trust score: {trust_score}/100 ({get_trust_label(trust_score)})'
        }
    ]
    
    # Generate summary
    if trust_score >= 75:
        summary = 'Content appears credible with good sourcing and minimal sensationalism. '
    elif trust_score >= 50:
        summary = 'Content has mixed credibility signals. Some concerns present but not definitively problematic. '
    elif trust_score >= 25:
        summary = 'Content shows multiple warning signs including sensational language or limited sourcing. '
    else:
        summary = 'Content exhibits significant credibility concerns. Exercise extreme caution. '
    
    # Add specific concerns
    if signals['emotional_density'] > 2:
        summary += 'High emotional language detected. '
    if signals['source_presence'] < 2:
        summary += 'Limited external source attribution. '
    if signals['domain_reputation'] < 40:
        summary += 'Content from platform with limited editorial oversight. '
    
    summary += 'Always verify claims through multiple independent sources.'
    
    methodology = 'This analysis uses rule-based heuristics including linguistic pattern matching, domain reputation scoring, and structural analysis. It does not rely on external APIs or AI models, making it fully deterministic and privacy-preserving.'
    
    return {
        'steps': steps,
        'summary': summary,
        'methodology': methodology
    }


def generate_signal_summary(signals: Dict[str, float]) -> str:
    """
    Generate human-readable summary of detected signals
    """
    points = []
    
    if signals['domain_reputation'] > 80:
        points.append('High-reputation source')
    elif signals['domain_reputation'] < 40:
        points.append('Lower-reputation platform')
    
    if signals['source_presence'] > 4:
        points.append('Well-sourced')
    elif signals['source_presence'] < 2:
        points.append('Limited sourcing')
    
    if signals['emotional_density'] > 2:
        points.append('High emotional language')
    
    if signals['sensational_punctuation'] > 5:
        points.append('Sensational presentation')
    
    return ', '.join(points) if points else 'Standard content patterns detected'


def get_trust_label(score: int) -> str:
    """
    Get descriptive label for trust score
    """
    if score >= 80:
        return 'High confidence'
    if score >= 60:
        return 'Moderate confidence'
    if score >= 40:
        return 'Low confidence'
    return 'Very low confidence'


def get_confidence_label(score: int) -> str:
    """
    Get confidence label for display
    """
    if score >= 80:
        return 'High Confidence'
    if score >= 60:
        return 'Moderate Confidence'
    if score >= 40:
        return 'Low Confidence'
    return 'Very Low Confidence'


def classify_content_type(url: str, content: str) -> str:
    """
    Classify content type based on URL and content patterns
    """
    url_lower = url.lower() if url else ''
    content_lower = content.lower() if content else ''
    
    # Social media
    social_domains = ['twitter', 'facebook', 'instagram', 'tiktok', 'reddit']
    if any(domain in url_lower for domain in social_domains):
        return 'social-media'
    
    # News articles
    news_indicators = ['news', 'times', 'post', 'journal', 'bbc', 'cnn']
    if any(indicator in url_lower for indicator in news_indicators):
        return 'news-article'
    
    # Educational/Research
    if '.edu' in url_lower or '.gov' in url_lower or 'research' in content_lower[:500]:
        return 'research'
    
    return 'general'


def generate_empty_analysis() -> Dict[str, Any]:
    """
    Generate analysis for empty content
    """
    return {
        "id": f"analysis-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "timestamp": datetime.now().isoformat(),
        "url": 'N/A',
        "content_type": 'unknown',
        "trust_score": 50,
        "confidence_label": 'No Analysis',
        "claims": [{
            "id": 1,
            "text": "No content provided for analysis",
            "status": "unverified",
            "confidence": 0,
            "sources": [],
            "reasoning": "Empty content cannot be analyzed"
        }],
        "flags": [{
            'type': 'warning',
            'category': 'No Content',
            'description': 'No content available for analysis',
            'details': 'Please provide content to analyze.'
        }],
        "reasoning": {
            'steps': [],
            'summary': 'No content was provided for analysis.',
            'methodology': 'N/A'
        },
        "agent_info": {
            "model": "heuristic-analyzer-v1",
            "version": "2.0.0",
            "mode": "production"
        },
        "metadata": {
            "content_length": 0,
            "claim_count": 0,
            "flag_count": 1,
            "analysis_time": 0.0
        }
    }
