import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { IInvoice } from '../../types/invoice';

type Props = {
  data: IInvoice;
};

const SecondaryColor = 'gray';
const textFontSize = 16;
const captionFontSize = 12;

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    fontSize: textFontSize,
  },
  titleBlock: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  /* contact and dates */
  sectionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
  },
  detailsFirstItem: {
    marginBottom: '10',
    flexDirection: 'row',
  },
  detailsLabel: {
    color: SecondaryColor,
  },
  contactValue: {
    marginLeft: 10,
  },
  dateValue: {
    marginLeft: 10,
    width: 100,
    textAlign: 'right',
  },
  /* list of items */
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: -10,
    paddingLeft: 10,
    marginRight: -10,
    paddingRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
  },
  itemTitle: {
    width: '49%',
    paddingLeft: 5,
  },
  itemQuantity: {
    width: '17%',
    textAlign: 'center',
  },
  itemRate: {
    paddingLeft: 8,
    width: '17%',
  },
  itemAmount: {
    width: '17%',
    textAlign: 'right',
    paddingRight: 8,
  },
  totalBlock: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
});

export const PdfDocument = ({ data }: Props) => {
  const total = data.items.reduce((acc, item) => {
    if (item.rate && item.quantity) {
      return acc + item.rate * item.quantity;
    }
    return acc;
  }, 0);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{data.title}</Text>
          <Text>{data.invoiceId}</Text>
        </View>
        <View style={styles.sectionDetails}>
          <View>
            <View style={styles.detailsFirstItem}>
              <Text style={styles.detailsLabel}>Invoice From:</Text>
              <Text style={styles.contactValue}>{data.from}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.detailsLabel}>Bill to:</Text>
              <Text style={styles.contactValue}>{data.to}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <View style={styles.detailsFirstItem}>
              <Text style={styles.detailsLabel}>Date:</Text>
              <Text style={styles.dateValue}>{data.date}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.detailsLabel}>Due Date:</Text>
              <Text style={styles.dateValue}>{data.dueDate}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: '30px' }}>
          <View style={styles.listHeader}>
            <Text style={styles.itemTitle}>Item</Text>
            <Text style={styles.itemQuantity}>Quantity</Text>
            <Text style={styles.itemRate}>Rate</Text>
            <Text style={styles.itemAmount}>Amount</Text>
          </View>

          {data.items.map((x) => (
            <View key={x.title} style={styles.listItem}>
              <Text style={styles.itemTitle}>{x.title}</Text>
              <Text style={styles.itemQuantity}>{x.quantity}</Text>
              <Text style={styles.itemRate}>${x.rate}</Text>
              <Text style={styles.itemAmount}>
                ${(x.quantity ?? 0) * (x.rate ?? 0)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.totalBlock}>
          <Text style={{ color: SecondaryColor, width: 100 }}>Total:</Text>

          <Text>${total}</Text>
        </View>
        {data.notes && (
          <View style={{ marginTop: 20, fontSize: captionFontSize }}>
            <Text style={{ color: SecondaryColor, marginBottom: 4 }}>
              Notes:
            </Text>
            <Text
              wrap
              style={{
                width: '300px',
                paddingLeft: 10,
              }}
            >
              {data.notes}
            </Text>
          </View>
        )}
        {data.terms && (
          <View style={{ marginTop: 20, fontSize: captionFontSize }}>
            <Text style={{ color: SecondaryColor, marginBottom: 4 }}>
              Terms:
            </Text>
            <Text
              wrap
              style={{
                width: '300px',
                paddingLeft: 10,
              }}
            >
              {data.terms}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
