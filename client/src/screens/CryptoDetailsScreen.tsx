import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import {BASE_URL} from '@env';

import {CryptoProfileInit, CryptoMarketDataInit} from '../models/crypto';
import convert from '../utils/convert';
import {FontsList} from '../theme/styles';
import Loader from '../components/Loader';
import MotiContainer from '../components/MotiContainer';

const CryptoDetails = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element => {
  const [cryptoProfile, setCryptoProfile] = useState(CryptoProfileInit);
  const [cryptoMarketData, setCryptoMarketData] =
    useState(CryptoMarketDataInit);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = route.params;
  const {width} = useWindowDimensions();

  // Get crypto profile & market data from api
  useEffect(() => {
    Promise.all([
      axios.get(`${BASE_URL}/api/crypto/profile/${id}`),
      axios.get(`${BASE_URL}/api/crypto/market-data/${id}`),
    ])
      .then(([profileData, marketData]) => {
        setCryptoProfile(profileData.data);
        setCryptoMarketData(marketData.data);
        setIsLoading(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: cryptoProfile.name,
    });
  }, [navigation, cryptoProfile.name]);

  return (
    <>
      {isLoading && (
        <View style={styles.container}>
          <MotiContainer>
            <View style={styles.header}>
              <View style={styles.headerInfo}>
                <Text style={styles.symbol}>{cryptoProfile?.symbol}/USD</Text>
                <Text style={styles.price}>
                  {convert(cryptoMarketData?.market_data?.price_usd)}
                </Text>
              </View>

              <View style={styles.headerTagLine}>
                <Text style={styles.line}>
                  {cryptoProfile?.profile?.general?.overview?.tagline}
                </Text>
              </View>
            </View>
          </MotiContainer>

          <MotiContainer>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.line}>percent change 1h</Text>
                <Text style={styles.priceChange}>
                  {`${convert(
                    cryptoMarketData?.market_data
                      ?.percent_change_usd_last_1_hour,
                  )}%`}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.line}>percent change 24h</Text>
                <Text style={styles.priceChange}>
                  {`${convert(
                    cryptoMarketData?.market_data
                      ?.percent_change_usd_last_24_hours,
                  )}%`}
                </Text>
              </View>
            </View>
          </MotiContainer>

          <ScrollView>
            <MotiContainer style={styles.cryptoInfo}>
              <View style={styles.cryptoInfoRow}>
                <Text style={styles.cryptoInfoTitle}>Overview</Text>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: `<p style=${styles.cryptoInfoText}>${
                      cryptoProfile?.profile?.general?.overview
                        ?.project_details ?? 'there is no overview of this coin.'
                    }</p>`,
                  }}
                />
              </View>

              <View style={styles.cryptoInfoRow}>
                <Text style={styles.cryptoInfoTitle}>Background</Text>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: `<p style=${styles.cryptoInfoText}>${
                      cryptoProfile?.profile?.general?.background
                        ?.background_details ??
                      'there is no background of this coin.'
                    }</p>`,
                  }}
                />
              </View>
            </MotiContainer>
          </ScrollView>
        </View>
      )}

      {!isLoading && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  header: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 10,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTagLine: {
    marginTop: 10,
  },
  symbol: {
    fontSize: 15,
    color: '#828A99',
    fontFamily: FontsList.ManropeBold,
  },
  price: {
    color: '#39CC77',
    fontSize: 22,
    fontFamily: FontsList.ManropeBold,
    textAlign: 'right',
  },
  line: {
    color: '#425F57',
    fontSize: 14,
    opacity: 0.8,
    fontFamily: FontsList.ManropeRegular,
  },
  priceContainer: {
    backgroundColor: '#F2F2F7',
    height: 70,
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  priceRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceChange: {
    color: '#39CC77',
    fontFamily: FontsList.ManropeBold,
  },
  cryptoInfo: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    flex: 1,
    borderRadius: 10,
  },
  cryptoInfoRow: {
    flex: 1,
    marginBottom: 15,
  },
  cryptoInfoTitle: {
    color: '#425F57',
    fontSize: 20,
    fontFamily: FontsList.ManropeBold,
    marginBottom: 5,
  },
  cryptoInfoText: {
    color: '#828A99',
    // fontFamily: FontsList.ManropeRegular,
  },
});

export default CryptoDetails;
