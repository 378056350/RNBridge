#! bin/bash

bundle_array=(common home search login good hot day sort chat mine collection coupon about order address addAddress)


# 删除文件夹
rm -r -f dist
# 新建文件夹
mkdir dist
mkdir dist/bundle
mkdir dist/zip
# 打包
for bundle in ${bundle_array[@]};do
    if [ $bundle == common ]
    then
        node node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file ./common.js --bundle-output ./dist/bundle/common.bundle --assets-dest ./dist/ --config ./common.config.js
    else
        node node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file ./src/pages/$bundle/page/${bundle}Provider.tsx --bundle-output ./dist/bundle/${bundle}.bundle --assets-dest ./dist/ --config ./business.config.js
   fi
done
# md5
for bundle in ${bundle_array[@]};do
    md5 dist/bundle/${bundle}.bundle
done
# 生成压缩包
for bundle in ${bundle_array[@]};do
    #   创建临时文件夹
    mkdir -p dist/tempzip/${bundle}/
    #   复制bundle
    cp dist/bundle/${bundle}.bundle dist/tempzip/${bundle}/${bundle}.bundle
    #   创建图片文件夹
    mkdir -p dist/tempzip/${bundle}/assets/src/assets/img
    #   复制图片
    cp -r dist/assets/src/assets/img/${bundle} dist/tempzip/${bundle}/assets/src/assets/img
    for file in dist/assets/src/assets/img/*;do
        if [ -f $file ]
        then
            cp -r $file dist/tempzip/${bundle}/assets/src/assets/img
        fi
    done
    #   开始压缩
    cd dist/tempzip
    zip -rq ${bundle}.bundle.zip ${bundle}
    #   移除临时文件夹
    cd ../../
    cp -r dist/tempzip/${bundle}.bundle.zip dist/zip
    rm -r dist/tempzip
done


