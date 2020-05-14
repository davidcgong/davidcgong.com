---
title: 'Backtesting the capital-asset pricing model'
date: 2019-05-20
template: "post"
draft: false
slug: "/posts/capm-quant-strat/"
category: "Finance"
tags:
  - "Finance"
  - "Quantitative Trading"
description: "Brief description of the implementation of a trivial and 100% overfit trading algorithm based on the capital asset pricing model."
---

<!-- <figure class="float-right" style="width: 240px; position: fixed; right: 0; top: 0">
<ul>
<li><a href="#model-refactoring">Model Refactoring</a></li>
<li><a href="#general-approach">General Approach</a></li>
<li><a href="#market-assumptions">Market Assumptions</a></li>
<li><a href="#safety-nets">Safety Nets</a></li>
<li><a href="#steps">Steps</a></li>
<li><a href="#results">Results</a></li>
<li><a href="#bear-market-case-study">Bear Market Case Study</a></li>
<li><a href="#conclusion">Conclusion</a></li>
</ul>
</figure> -->


<!-- - [Model Refactoring](#model-refactoring)
- [General Approach](#general-approach)
- [Market Assumptions](#market-assumptions)
- [Safety Nets](#safety-nets)
- [Steps](#steps)
- [Results](#results)
- [Bear Market Case Study](#bear-market-case-study)
- [Conclusion](#conclusion) -->

## Update (May 2020)
I backtested this strategy for a year and the net gain was 2% after 1 year. Which still didn't really beat the index but it didn't really lose either so... is it good? Only time will tell. :) 

Also, check the bottom of the post for an excel spreadsheet of the trades and messages sent from the exchange during the backtest.

## Intro

This is my first attempt at making a blog post about a method in quantitative investing, where I investigate the capital asset pricing model, a popularly used equation that seeks to find expected return rates on assets given beta. 

This is also the algorithm currently that I have conducted forward-testing on since 2018-12.

A visualization of the backtesting results of employing a strategy using CAPM will be provided at the end of this post.

In later posts, I will also talk about the arbitrage pricing theory, Fama-Macbeth regression, and various other techniques employed by hedge funds such as statistical arbitrage.

## Model refactoring

The traditional equation can be represented as follows:

$$
r_i = r_f + \beta_i(r_m - r_f)
$$

$$r_f =$$ Risk free market return <br> 
$$r_m =$$ Market return <br> 
$$\beta =$$ Beta


For the statistician and quant, however, it would be more plausible to represent and refactor the previous equation into the following for least-squares regression analysis:

$$
r_i - r_f = \beta_i(r_m - r_f) + \epsilon
$$

In this case, $$\alpha$$  is represented by the intercept, or $$\epsilon$$. The slope is $$\beta$$. A graph visualization can be seen as follows:

<img src="http://www.moneychimp.com/articles/risk/capm_regression.gif"> 

With this data, we can move onto establishing our approach.

## General approach

Now that the general premises are established, we can move onto creating a strategy. Thinking on the broader scale, we can apply a strategy to the Dow Jones Industrial Average with some modifications to stock selection. 

Based on observable trends, we notice that for the market in general, stocks that beat the market will continue to beat the market over prolonged periods of time.*

At the same time, learning how to detect when to pare down risk prior or during recessions is also important. As a result, our strategy will have the following guidelines:

1. Optimize returns on directional alpha over minimizing beta
    - Pick the top 5 stocks based on alpha from our regression analysis out of the DOW 30
        - Regression is based on the past 15 trading days (3 weeks)
2. Pare down risk during recession
    - Invest in bonds and gold (TLT and GLD)
    - Reduce risk by decreasing holdings
    - Hedge with long puts
3. Monthly executions
    - Avoid large commission fees
    - Less important to compete with HFT and hedge funds for intraday price execution
    - Only a maximum of 5 trades a month, reducing commission fees
4. Selecting stocks outside of DOW
    - New tech conglomerates not included in DOW (AMZN ...)
    - Defense companies because there the government will always be there to buy weapons (Raytheon, Lockheed Martin, etc.)
    - Potential growth companies that achieve high fundamental evaluation (TWLO, SHOP, TTD, etc.) <- though this had not been included in the algorithm

## Market assumptions

With this strategy, one can reasonably assume that during a market the CAPM model will outperform the index through using monthly turnovers to automatically invest in high alpha stocks. Taxes and commissions could be issues, depending on the broker and whether or not one is using an LLC to handle profits.

As momentum and trend-following strategies suggest, the underlying assumption is that stocks that beat the market will continue to beat the market. Mean reversion is just the opposite - if a stock price goes up one should expect it to go back down. Both of these are right, depending on time frames.

Our strategy is based heavily on trend-following more so than momentum, as we are looking at price action over fundamentals. In this case, the bull market heavily favors us, but we still need to have a plan to reduce drawdown risk during recessions.

## Safety nets

Momentum strategies that focus solely on alpha without accounting for volatility in the market are bound to fail epicly during recessions, and especially during depressions. 

Expect more than 50% drawdown of an account value if there are no cases to test for a recession (i.e. no hedging, no reduction of holdings, etc.). Of course, not everyone can exactly time the recession, but there are ways to make sure there are at least some safety nets in place.

In the strategy implemented, we will only look at the moving averages to determine whether or not the possibility of entering a bear market exists. The problem is when the stock market has a panic in one day, ultimately resulting in a failure to minimize recession risk. 

Here are a few potential datapoints to measure the recession:

1. Strength of the economy
    - Obtaining raw data to measure important metrics for determining the health of the economy
        - Text mining, web scraping, NLP for news articles
        - Inversion of the yield curve
        - The debt cycle
        - ...
2. Simple technicals
    - Trading below anything rolling 75+ EMA/SMA (we will be using this)
    - Finding potential tops in the market
    - Mean-variance analysis
    - Volume analysis
    - ...

For this strategy, the importance of being able to adjust the model and holdings based on the state of the economy is quite important to reduce drawdown and increase our Sharpe ratio.

## Steps
 
I won't be publishing the algorithm here, but in general the idea is there. It goes something like this:

__Initialization / Data Preparation (at beginning):__

1. Obtain
    - Historical data
    - Extract
2. Filter
    - Provide a list of tickers
    - Create a filtered list

__Rebalancing / Scheduled Functions (low-frequency, monthly):__

3. Analyze
    - Regression
    - Machine Learning
    - Normalization
4. Select
    - Greeks
        - Alpha, Beta, Pi, Theta, etc.
    - Optimization
        - Grid search, random search, simulated annealing, RHC, genetic algorithms

5. Execute

## Results

I executed this strategy on the QuantConnect platform and obtained the following results:

![Backtest - 2006 to 2019](https://i.imgur.com/UJMa0XZ.png)

<figure>
	<blockquote>
		<p>There is no such thing as a bad backtest.</p>
		<footer>
			<cite>— Every quant ever.</cite>
		</footer>
	</blockquote>
</figure>

The returns are remarkable, but here's the catch - this is just a backtest. To truly be confident that our algorithm works out as we would like to, there are still many factors to consider. 

1. Do not commit significant capital to an algorithm until it cannot tell the difference between any timeframe.
2. Test during periods (our algorithm did not perform too well from 2014 - 2016).
3. Changing parameters to overfit to the noise in data.
4. ...

Not to mention, the maximum drawdown in this case was at around 39%. This is pretty substantial, because imagine if during the next recession 70m becomes 42m in the span of a month. It wouldn't feel so good.

Check out the trades here if you'd like, I will present forth a visualization of the trades at some point, or if you would like to provide one for me I'd gladly love to hear more about it.

[Download trades](/files/front-test-capm.csv)

## Bear market case study

Luckily for us in the 2008 recession, since the algorithm switches to treasuries in the case of a recession, we were able to gain back the money lost and also made more through capitalizing on both the bear market and buying stocks at a discount, though this happened after months of painful losses.

A plausible solution would be to:
1. Dynamically allocate holdings based on economic health
2. Instead of monthly executions, we check whether or not the bear criteria is met in the same day.
	- Tradeoff: Being unable to tell the difference between corrections and recessions, and higher trading commisions.

In my recent forward-test as well for the near bear-market we just experienced, I was able to achieve a 50% return from December 2018 to May 2019, mainly due to the algorithm switching to TLT in November and essentially holding it until February, achieving a 10% return from this period.

The algorithm then was able to buy the stocks at a discount as well, which is precisely why we use a rolling 75 day mean in order to execute our treasury transfer signal or equity holding signals. The defense stocks also played a large factor as they tend to have higher alphas than other stocks when the market is relatively weak.

## Conclusion

There are still many ways we can improve the model and make more probable decisions about how to play the recession. We can also develop an equation, a deep learning model, with hyperparameters to dynamically allocate our holdings in specific stocks and for stock selection. 

I plan to utilize this strategy for my individual account and will make updates to how it performs in the next bear, sideways, or bull market. The 37% annualized return is too good to be true due to the biases I listed above, and I will already be delighted if it can even achieve 13% on average a year.





<!-- - [The first transition](#the-first-transition)
- [The digital age](#the-digital-age)
- [Loss of humanity through transitions](#loss-of-humanity-through-transitions)
- [Chasing perfection](#chasing-perfection)

An Essay on Typography by Eric Gill takes the reader back to the year 1930. The year when a conflict between two worlds came to its term. The machines of the industrial world finally took over the handicrafts.

The typography of this industrial age was no longer handcrafted. Mass production and profit became more important. Quantity mattered more than the quality. The books and printed works in general lost a part of its humanity. The typefaces were not produced by craftsmen anymore. It was the machines printing and tying the books together now. The craftsmen had to let go of their craft and became a cog in the process. An extension of the industrial machine.

But the victory of the industrialism didn’t mean that the craftsmen were completely extinct. The two worlds continued to coexist independently. Each recognising the good in the other — the power of industrialism and the humanity of craftsmanship. This was the second transition that would strip typography of a part of its humanity. We have to go 500 years back in time to meet the first one.

## The first transition

A similar conflict emerged after the invention of the first printing press in Europe. Johannes Gutenberg invented movable type and used it to produce different compositions. His workshop could print up to 240 impressions per hour. Until then, the books were being copied by hand. All the books were handwritten and decorated with hand drawn ornaments and figures. A process of copying a book was long but each book, even a copy, was a work of art.

The first printed books were, at first, perceived as inferior to the handwritten ones. They were smaller and cheaper to produce. Movable type provided the printers with flexibility that allowed them to print books in languages other than Latin. Gill describes the transition to industrialism as something that people needed and wanted. Something similar happened after the first printed books emerged. People wanted books in a language they understood and they wanted books they could take with them. They were hungry for knowledge and printed books satisfied this hunger.

![42-line-bible.jpg](/media/42-line-bible.jpg)

*The 42–Line Bible, printed by Gutenberg.*

But, through this transition, the book lost a large part of its humanity. The machine took over most of the process but craftsmanship was still a part of it. The typefaces were cut manually by the first punch cutters. The paper was made by hand. The illustrations and ornaments were still being hand drawn. These were the remains of the craftsmanship that went almost extinct in the times of Eric Gill.

## The digital age

The first transition took away a large part of humanity from written communication. Industrialisation, the second transition described by Eric Gill, took away most of what was left. But it’s the third transition that stripped it naked. Typefaces are faceless these days. They’re just fonts on our computers. Hardly anyone knows their stories. Hardly anyone cares. Flicking through thousands of typefaces and finding the “right one” is a matter of minutes.

> In the new computer age the proliferation of typefaces and type manipulations represents a new level of visual pollution threatening our culture. Out of thousands of typefaces, all we need are a few basic ones, and trash the rest.
>
— Massimo Vignelli

Typography is not about typefaces. It’s not about what looks best, it’s about what feels right. What communicates the message best. Typography, in its essence, is about the message. “Typographical design should perform optically what the speaker creates through voice and gesture of his thoughts.”, as El Lissitzky, a famous Russian typographer, put it.

## Loss of humanity through transitions

Each transition took away a part of humanity from written language. Handwritten books being the most humane form and the digital typefaces being the least. Overuse of Helvetica is a good example. Messages are being told in a typeface just because it’s a safe option. It’s always there. Everyone knows it but yet, nobody knows it. Stop someone on the street and ask him what Helvetica is? Ask a designer the same question. Ask him where it came from, when, why and who designed it. Most of them will fail to answer these questions. Most of them used it in their precious projects but they still don’t spot it in the street.

<figure>
	<blockquote>
		<p>Knowledge of the quality of a typeface is of the greatest importance for the functional, aesthetic and psychological effect.</p>
		<footer>
			<cite>— Josef Mueller-Brockmann</cite>
		</footer>
	</blockquote>
</figure>

Typefaces don’t look handmade these days. And that’s all right. They don’t have to. Industrialism took that away from them and we’re fine with it. We’ve traded that part of humanity for a process that produces more books that are easier to read. That can’t be bad. And it isn’t.

> Humane typography will often be comparatively rough and even uncouth; but while a certain uncouthness does not seriously matter in humane works, uncouthness has no excuse whatever in the productions of the machine.
>
> — Eric Gill

We’ve come close to “perfection” in the last five centuries. The letters are crisp and without rough edges. We print our compositions with high–precision printers on a high quality, machine made paper.

![type-through-time.jpg](/media/type-through-time.jpg)

*Type through 5 centuries.*

We lost a part of ourselves because of this chase after perfection. We forgot about the craftsmanship along the way. And the worst part is that we don’t care. The transition to the digital age made that clear. We choose typefaces like clueless zombies. There’s no meaning in our work. Type sizes, leading, margins… It’s all just a few clicks or lines of code. The message isn’t important anymore. There’s no more “why” behind the “what”.

## Chasing perfection

Human beings aren’t perfect. Perfection is something that will always elude us. There will always be a small part of humanity in everything we do. No matter how small that part, we should make sure that it transcends the limits of the medium. We have to think about the message first. What typeface should we use and why? Does the typeface match the message and what we want to communicate with it? What will be the leading and why? Will there be more typefaces in our design? On what ground will they be combined? What makes our design unique and why? This is the part of humanity that is left in typography. It might be the last part. Are we really going to give it up?

*Originally published by [Matej Latin](http://matejlatin.co.uk/) on [Medium](https://medium.com/design-notes/humane-typography-in-the-digital-age-9bd5c16199bd?ref=webdesignernews.com#.lygo82z0x).* -->