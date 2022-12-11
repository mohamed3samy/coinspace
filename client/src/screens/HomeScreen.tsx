import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {socket} from '../../App';
import CryptoItem from '../components/CryptoItem';
import Loader from '../components/Loader';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  const [cryptoList, setCryptoList] = useState(null);

  const openCryptoDetails = (id: string) => {
    navigation.navigate('Details', {id});
  };

  const getCryptos = () => {
    socket.on('crypto', data => {
      setCryptoList(data);
    });
  };

  useEffect(() => {
    getCryptos();
  }, []);

  if (!cryptoList) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptoList}
        renderItem={({item}) => {
          return (
            <CryptoItem item={item} openCryptoDetails={openCryptoDetails} />
          );
        }}
        keyExtractor={(item: any) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 12}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default HomeScreen;
