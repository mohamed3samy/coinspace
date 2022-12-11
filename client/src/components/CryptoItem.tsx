import React, {FC} from 'react';
import {StyleSheet, Text, Pressable, View, Platform} from 'react-native';
import {AnimatePresence} from 'moti';

import {Crypto} from '../models/crypto';
import convert from '../utils/convert';
import {FontsList} from '../theme/styles';
import MotiContainer from './MotiContainer';

interface Props {
  item: Crypto;
  openCryptoDetails: any;
}

const CryptoItem: FC<Props> = ({item, openCryptoDetails}): JSX.Element => {
  return (
    <AnimatePresence>
      <MotiContainer>
        <Pressable
          android_ripple={{color: '#f8fafc'}}
          style={({pressed}) => [
            styles.crypto,
            pressed && styles.cryptoPressed,
          ]}
          onPress={() => openCryptoDetails(item.id)}>
          <Text style={styles.name}>{item?.name}</Text>

          <View style={styles.textContainer}>
            <Text style={styles.symbol}>{item?.symbol}/USD</Text>
            <Text style={styles.price}>
              {convert(Math.round(item?.price * 1000) / 1000)}
            </Text>
          </View>
        </Pressable>
      </MotiContainer>
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  crypto: {
    borderRadius: 5,
    backgroundColor: '#F2F2F7',
    padding: 20,
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    elevation: 1,
    shadowColor: '#1e293b',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  cryptoPressed: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  name: {
    color: '#425F57',
    fontSize: 20,
    fontFamily: FontsList.ManropeBold,
  },
  symbol: {
    color: '#828A99',
    fontSize: 14,
    fontFamily: FontsList.ManropeRegular,
  },
  price: {
    color: '#39CC77',
    fontSize: 22,
    fontFamily: FontsList.ManropeBold,
  },
});

export default CryptoItem;
