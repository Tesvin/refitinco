import {
    Accordion,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

export default function FAQ () {
    return (
        <Accordion>
            <h2 className='text-4xl text-center font-sans font-semibold text-green-700'>FAQ</h2>
            <AccordionItem>
                <h2 className='font-sans text-lg font-semibold'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                    Who are we?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <p className='font-sans'>
                        Refitinco Solutions are a group of Seasoned Entreprenuers 
                        with Interest in Real Estate, Finance and Information 
                        Technology (IT). We have been in Business of Real Estate 
                        Management and Finance for over five (5) years now, 
                        we decided it is time to scale up to the Global Stage 
                        in different Niches. With vast experience in Digital 
                        marketing, Web and Mobile apps development, and Graphic 
                        Design, we intend to Pioneer the very First fully 
                        Crowd-funded online Start-Up Tech company.
                    </p>     
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                    Total number of share units available now at Pre IPO?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    30,000 units
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        Total number of shares available to the public (At this Pre-IPO stage)?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    15,000 units
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                    How long will the Pre-IPO (Seed Capital funding) last?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Three (3) months Duration
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                   How much is the price for a unit share?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    $25 per share
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        When do I start getting dividends from my investments?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    First dividends earnings start from 18 months after the end of this Pre-IPO
                    Earnings on dividends is not a one time thing. It continues periodically at
                    regular intervals every year. E.g Bi-annually, Quarterly or once a year.
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        When do my earnings stop?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                   Dividends sharing earning do not stop. It is a continuous exercise as long
                   as our collective companies are in existence.
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2 className='font-semibold font-sans'>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        What else do I do after purchasing a unit share?
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Nothing, Just follow our progress as a member of the company.
                    But if you want to be active participant in decision making of this company,
                    then you can buy more units (within the allowable available units) in order to
                    be among the top 5 investors and earn a seat in the boardroom where critical decisions
                    about the company will be made.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}