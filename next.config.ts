import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {}

const withNextIntl = createNextIntlPlugin('./src/configs/next-intl.ts')
export default withNextIntl(nextConfig)
