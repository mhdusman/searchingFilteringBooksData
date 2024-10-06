export const resultMeta = (source, indexName) => {
    let html = ''
    if (indexName === "jamati_books_level1") {
        html += (source.collection) ? source.collection : '';
        html += (source.vol_no) ? ` Volume ${source.vol_no}` : '';
        html += (source.page_no) ? ` Page ${source.page_no}` : '';
        html += (source.para_no) ? ` Paragraph ${source.para_no}` : '';
    } else if (indexName === "review_of_religions") {
        html += 'Review of Religions'
        html += (source.month) ? ` ${source.month}` : '';
        html += (source.year) ? ` ${source.year}` : '';
        html += (source.page_no) ? ` Page ${source.page_no}` : '';
        html += (source.page_no === 0 && source.part) ? ` Part ${source.part}` : '';
    } else if (indexName === 'alfazal') {
        html += 'Alfazal'
        html += (source.date) ? ` ${source.date}` : '';
        html += (source.month) ? ` ${source.month}` : '';
        html += (source.year) ? ` ${source.year}` : '';
        html += (source.page_no) ? ` Page ${source.page_no}` : '';
        html += (source.extras) ? ` ${source.extras}` : '';
    } 
    // else if(indexName === 'eng_jamaat_books' || indexName === 'arabic_books'){
    //     if(source.collection)
    //         html += source.collection
    //     if(source.vol_no)
    //         html += ` Volume ${source.vol_no}`
    //     if(source.book_name)
    //         html += ` ${source.book_name}`
    //     if(source.page_no)
    //         html += ` Page ${source.page_no}`
    //     if(source.page_no === 0)
    //         html += ' Preface/Foreword'
    // }
    else if(indexName === 'holy_quran'){
        html += `Chapter ${source.chapter}`
        html += ` Verse ${source.verse}`
    }
    return html
}

export const categoryData = [
    { key: 'holyQuran', text: 'The Holy Quran' },
    { key: 'books', text: 'Jamati Books' },
    { key: 'engBooks', text: 'English Jamaat Books' },
    { key: 'ror', text: 'Review of Religions' },
    { key: 'alfazal', text: 'Al-Fazal' },
    { key: 'arabicBooks', text: 'Arabic Books' },
    // { key: 'HOLY_QURAN', text: 'The Holy Quran' },
    // { key: 'JAMATI_BOOKS', text: 'Jamati Books' },
    // { key: 'ENGLISH_BOOKS', text: 'English Jamaat Books' },
    // { key: 'REVIEW_RELIGION', text: 'Review of Religions' },
    // { key: 'AL_FAZAL', text: 'Al-Fazal' },
    // { key: 'ARABIC_BOOKS', text: 'Arabic Books' },
]

export const getCategoryText = (category) => {
    const categoryText = categoryData.filter(d => (d.key == category) ? true : false);
    return categoryText[0].text;
}